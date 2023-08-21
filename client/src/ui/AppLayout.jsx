import SideBar from "./SideBar";
import Main from "./Main";

const AppLayout = () => {
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
