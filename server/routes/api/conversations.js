const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const { checkOnlineUser } = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (checkOnlineUser(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      const unreadMessageCount = await Message.count({
        where: {
          conversationId: convoJSON.id,
          senderId: convoJSON.otherUser.id,
          read: false,
        },
      });
      convoJSON.unreadMessageCount = unreadMessageCount;
      // set properties for notification count and latest message preview
      convoJSON.latestMessageText =
        convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }
    conversations.sort((conv1, conv2) => {
      return (
        conv2.messages[conv2.messages.length - 1].createdAt -
        conv1.messages[conv1.messages.length - 1].createdAt
      );
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.patch("/read-status", async (req, res, next) => {
  const { user } = req;
  const { convoId, senderId } = req.body;

  try {
    if (!user) {
      return res.sendStatus(401);
    } else if (!convoId || !senderId) {
      return res.sendStatus(400);
    }
    const { user1Id, user2Id } = await Conversation.findByPk(convoId);
    if (user1Id !== user.id && user2Id !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await Message.markMessagesAsRead(senderId, convoId);

    const updatedConversation = await Conversation.getDetailsById(
      convoId,
      user.id
    );
    const convoJSON = updatedConversation.toJSON();

    if (convoJSON.user1) {
      convoJSON.otherUser = convoJSON.user1;
      delete convoJSON.user1;
    } else if (convoJSON.user2) {
      convoJSON.otherUser = convoJSON.user2;
      delete convoJSON.user2;
    }
    convoJSON.latestMessageText =
      convoJSON.messages[convoJSON.messages.length - 1].text;

    res.status(200).json({ conversation: convoJSON });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
