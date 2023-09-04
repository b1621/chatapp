import axios from "axios";
import { useState } from "react";
import { useChat } from "../features/chat/ChatContext";
import ChatList from "../features/chat/ChatsList";

const SideBar = ({ setShowAddGroup, fetchAgain }) => {
  const [search, setSearch] = useState("");
  // const [chats, setChats] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { chats, setChats, setSelectedChat, selectedChat } = useChat();

  const handleSearch = async () => {
    if (!search) return;

    try {
      setShowSearchResult(true);
      setLoading(true);
      const response = await axios.get(`user?search=${search}`);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setShowSearchResult(false);
      setLoadingChat(true);

      const { data } = await axios.post(`chat`, { userId });
      console.log(chats);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data);

      setLoadingChat(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(searchResult);
  return (
    <div className="w-1/4">
      <header className=" flex space-x-3  bg-slate-900 px-2 py-3">
        <input
          type="text"
          className=" w-full bg-slate-400 px-3 py-1 text-black outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="rounded-md border px-3 hover:bg-slate-600"
        >
          Search
        </button>
      </header>
      {showSearchResult ? (
        <div className="relative">
          <div className="">
            <button
              className="absolute right-3 top-0 text-xl"
              onClick={() => {
                setShowSearchResult(false);
                setSearch("");
              }}
            >
              &times;
            </button>
          </div>
          <div className="">
            <h2 className="my-1  text-center text-lg">search results</h2>
          </div>
          {loading ? (
            <div> Loading ... </div>
          ) : (
            <div>
              <div>
                {searchResult?.map((user) => (
                  <div
                    key={user._id}
                    className=" my-2 flex space-x-3 bg-slate-700 px-2 py-1 hover:bg-slate-600"
                    onClick={() => accessChat(user._id)}
                  >
                    <div>
                      <img
                        className=" h-10 rounded-full"
                        src={user.pic}
                        alt=""
                      />
                    </div>
                    <div>
                      <p>{user.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ChatList fetchAgain={fetchAgain} setShowAddGroup={setShowAddGroup} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
