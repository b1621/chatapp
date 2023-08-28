import SideBar from "./SideBar";
import Main from "./Main";
import { useAuth } from "../features/user/AuthContext";
import { useState } from "react";

const AppLayout = () => {
  // const { isAuthenticated } = useAuth();

  // console.log("is Authenticated = ", isAuthenticated);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div>
      <div className="relative flex h-screen">
        <SideBar />
        <Main setShowProfile={setShowProfile} />
        {showProfile && (
          <div className="absolute flex h-screen w-screen  justify-center">
            <div className=" mt-36 w-96  border">
              <button onClick={() => setShowProfile(false)}>&times;</button>
              profile
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
