import { Outlet } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";
import { useChat } from "../features/chat/ChatContext";

const Main = ({ setShowProfile }) => {
  const { user } = useAuth();
  const { selectedChat, setSelectedChat } = useChat();
  const userName = user.name;
  const nameInit = userName.charAt(0).toUpperCase();
  // console.log(nameInit);
  return (
    <div className="w-full bg-slate-800">
      <header className="flex justify-between bg-slate-900/40 py-2">
        <div>
          {selectedChat && (
            <>
              <span
                onClick={() => setSelectedChat("")}
                className=" mx-4 cursor-pointer text-3xl hover:text-slate-400"
              >
                &larr;
              </span>
            </>
          )}
        </div>

        <div className="mr-10 flex items-center space-x-7">
          <img
            src="/icons8-notification-40.png"
            className=" h-7 hover:cursor-pointer"
            alt="notification"
          />

          <p
            className="rounded-full border px-3 py-1 text-xl hover:cursor-pointer"
            onClick={() => setShowProfile(true)}
          >
            {nameInit}
          </p>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Main;
