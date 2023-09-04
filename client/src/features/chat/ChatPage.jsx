import React from "react";
import { useChat } from "./ChatContext";

const ChatPage = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChat();
  return (
    <>
      {selectedChat ? (
        <>
          <div>ChatPage</div>
          <p>{selectedChat._id}</p>
        </>
      ) : (
        <div className="flex h-screen flex-col justify-center  text-center">
          <p className=" text-2xl">Chat Not Selected !!</p>
        </div>
      )}
    </>
  );
};

export default ChatPage;
