import React from "react";
import { useChat } from "./ChatContext";

const ChatPage = () => {
  const { selectedChat } = useChat();
  return (
    <>
      {selectedChat ? (
        <>
          <div>ChatPage</div>
          <p>{selectedChat._id}</p>
        </>
      ) : (
        <div>Chat Not Selected !!</div>
      )}
    </>
  );
};

export default ChatPage;
