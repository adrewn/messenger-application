const { Op } = require("sequelize");
const db = require("../db");
const User = require("./user");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.listConversations = async function (userId) {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attributes: ["id"],
  });

  // return conversation or null if it doesn't exist
  return conversations;
};

Conversation.getDetailsById = async function (convoId, currentUserId) {
  const conversation = await Conversation.findOne({
    where: {
      id: convoId,
    },
    attributes: ["id"],
    order: [[Message, "createdAt", "ASC"]],
    include: [
      { model: Message, order: ["createdAt", "ASC"] },
      {
        model: User,
        as: "user1",
        where: {
          id: {
            [Op.not]: currentUserId,
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
            [Op.not]: currentUserId,
          },
        },
        attributes: ["id", "username", "photoUrl"],
        required: false,
      },
    ],
  });

  return conversation;
};

module.exports = Conversation;
