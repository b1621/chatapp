// import { useNavigate } from "react-router-dom";

import { createContext, useContext, useState, useEffect } from "react";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     setUser(userInfo);

  //     if (!userInfo) navigate("/");
  //   }, [navigate]);

  return (
    <chatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

function useChat() {
  const context = useContext(chatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within an chatProvider");
  }
  return context;
}

export { ChatProvider, useChat };
