const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if conversation id, we validate users are correct then create message otherwise throw 403 error

    if (conversationId) {
      const { user1Id, user2Id } = await Conversation.findByPk(conversationId);

      if (
        (user1Id === senderId && user2Id === recipientId) ||
        (user1Id === recipientId && user2Id === senderId)
      ) {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
        });
        return res.json({ message, sender });
      }
      return res.status(403).json({ error: "Unauthorized" });
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
