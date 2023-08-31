import axios from "axios";
import { getSender, getSenderData } from "../../config/ChatLogics";
import { useAuth } from "../user/AuthContext";
import { useChat } from "./ChatContext";
import { useEffect } from "react";

const ChatList = () => {
  const { chats, setChats, selectedChat, setSelectedChat } = useChat();
  const { user } = useAuth();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("chat");
      // console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetchChats();
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      <h2 className="my-1  text-center text-lg">chats list</h2>
      <div className="flex justify-end">
        <button className=" my-2 mr-2 border px-4 py-1">+ Group</button>
      </div>
      {chats ? (
        <div className="mx-1 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={` flex cursor-pointer items-center space-x-3 bg-slate-700 px-2 py-2 hover:bg-slate-800 ${
                selectedChat?._id === chat._id
                  ? " bg-cyan-800 hover:bg-cyan-900"
                  : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <img
                className=" h-10 rounded-full"
                src={getSenderData(user, chat.users).pic}
                alt=""
              />
              <p>
                {!chat.isGroupChat
                  ? getSender(user, chat.users)
                  : chat.chatName}
              </p>

              {chat.latestMessage && (
                <p>
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No Chat Yet !!!</div>
      )}
    </div>
  );
};

export default ChatList;
