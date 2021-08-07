const onlineUsers = {};

const checkOnlineUser = (userId) => {
  return onlineUsers.hasOwnProperty(userId);
};

const removeOnlineUser = (userId, socketId) => {
  const index = onlineUsers[userId].indexOf(socketId);
  onlineUsers[userId].splice(index, 1);
  const logout = onlineUsers[userId].length === 0;

  if (logout) {
    delete onlineUsers[userId];
  }

  return logout;
};

const addOnlineUser = (userId, socketId) => {
  if (checkOnlineUser(userId)) {
    return onlineUsers[userId].push(userId);
  } else {
    return (onlineUsers[userId] = [socketId]);
  }
};

const getSocketId = (userId) => {
  return onlineUsers[userId];
};

module.exports = {
  checkOnlineUser,
  removeOnlineUser,
  addOnlineUser,
  getSocketId,
};
