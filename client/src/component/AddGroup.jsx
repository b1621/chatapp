import { useEffect, useState } from "react";
import { useAuth } from "../features/user/AuthContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { toast } from "react-toastify";
import { useChat } from "../features/chat/ChatContext";

const animatedComponents = makeAnimated();

const AddGroup = ({ setShowAddGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionData, setOptionData] = useState([]);

  const { chats, setChats, setSelectedChat, selectedChat } = useChat();
  // var options = optionData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const users = selectedOptions.map((opt) => opt.value);

    if (!users || !groupName) {
      toast.error("Please fill all the fields");
      return;
    }

    if (users.length < 2) {
      toast.error("can't create group, users less than 2");
      return;
    }
    try {
      const { data } = await axios.post("/chat/group", {
        users,
        name: groupName,
      });

      // return;
      // console.log(data);
      setChats([...chats, data]);
      toast.success("New Group Chat Created");
      setSelectedChat(data);
      setShowAddGroup(false);
    } catch (error) {
      toast.error(error?.response.data);
      console.error("Error fetching users:", error);
      // return;
    }
  };

  const fetchAllusers = async () => {
    try {
      const { data } = await axios.get("/user/getusers");

      const opt = data.map((user) => ({ value: user._id, label: user.name }));

      setOptionData(opt);
      // return;
    } catch (error) {
      console.error("Error fetching users:", error);
      // return;
    }
  };

  useEffect(() => {
    fetchAllusers();
  }, []);
  return (
    <div className="absolute flex h-screen w-screen  justify-center  backdrop-blur-sm backdrop-brightness-100">
      <div className=" relative mt-36 h-fit w-[500px] bg-slate-700">
        <button
          className="absolute right-3 text-3xl hover:text-slate-300"
          onClick={() => setShowAddGroup(false)}
        >
          &times;
        </button>

        <form
          onSubmit={submitHandler}
          className="mx-auto my-14 space-y-4 px-5 text-center text-lg"
        >
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            className="w-full rounded-sm py-1 text-center text-slate-800 outline-none"
            placeholder="GroupChat Name"
          />
          {/* <Select options={options} /> */}
          <Select
            name="selectedOptions"
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[options[4], options[5]]}
            isMulti
            value={selectedOptions}
            options={optionData}
            onChange={(selectedValues) => {
              console.log("selected values : ", selectedValues);
              setSelectedOptions(selectedValues);
            }}
            className=" text-slate-800"
          />
          <button type="submit" className="my-2 border px-4 py-1">
            Add Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
