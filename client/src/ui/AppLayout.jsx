import SideBar from "./SideBar";
import Main from "./Main";
import { useAuth } from "../features/user/AuthContext";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  console.log("is Authenticated = ", isAuthenticated);
  return (
    <div>
      <div className="flex h-screen ">
        <SideBar />
        <Main />
      </div>
    </div>
  );
};

export default AppLayout;
