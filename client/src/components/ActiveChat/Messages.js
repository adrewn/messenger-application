import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [readMessageBubble, setReadMessageBubble] = useState({
    isShowing: false,
    messageId: null,
  });

  const checkIfLastReadMessage = (message) => {
    const { isShowing } = readMessageBubble;
    if (!isShowing && message.read && message.senderId === userId) {
      setReadMessageBubble({ isShowing: true, messageId: message.id });
    }
  };
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        checkIfLastReadMessage(message);

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            showReadBubble={readMessageBubble.messageId === message.id}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
