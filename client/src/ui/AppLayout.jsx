import SideBar from "./SideBar";
import Main from "./Main";
// import { useAuth } from "../features/user/AuthContext";
import { useState } from "react";
import Profile from "../component/Profile";
import AddGroup from "../component/AddGroup";

const AppLayout = () => {
  // const { isAuthenticated } = useAuth();

  // console.log("is Authenticated = ", isAuthenticated);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div>
      <div className="relative flex h-screen">
        <SideBar setShowAddGroup={setShowAddGroup} fetchAgain={fetchAgain} />
        <Main
          setShowProfile={setShowProfile}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
        {showProfile && <Profile setShowProfile={setShowProfile} />}
        {showAddGroup && <AddGroup setShowAddGroup={setShowAddGroup} />}
      </div>
    </div>
  );
};

export default AppLayout;
