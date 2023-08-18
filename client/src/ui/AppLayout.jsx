import React from "react";
import SideBar from "./SideBar";
import Main from "./Main";

const AppLayout = () => {
  return (
    <div className="flex h-screen border">
      <SideBar />
      <Main />
    </div>
  );
};

export default AppLayout;
