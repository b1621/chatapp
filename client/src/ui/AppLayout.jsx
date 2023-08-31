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
  return (
    <div>
      <div className="relative flex h-screen">
        <SideBar setShowAddGroup={setShowAddGroup} />
        <Main setShowProfile={setShowProfile} />
        {showProfile && <Profile setShowProfile={setShowProfile} />}
        {showAddGroup && <AddGroup setShowAddGroup={setShowAddGroup} />}
      </div>
    </div>
  );
};

export default AppLayout;
