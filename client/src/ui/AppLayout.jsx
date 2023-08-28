import SideBar from "./SideBar";
import Main from "./Main";
// import { useAuth } from "../features/user/AuthContext";
import { useState } from "react";
import Profile from "../component/Profile";

const AppLayout = () => {
  // const { isAuthenticated } = useAuth();

  // console.log("is Authenticated = ", isAuthenticated);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div>
      <div className="relative flex h-screen">
        <SideBar />
        <Main setShowProfile={setShowProfile} />
        {showProfile && <Profile setShowProfile={setShowProfile} />}
      </div>
    </div>
  );
};

export default AppLayout;
