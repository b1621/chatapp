import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex items-center justify-between">
      <Link to="/">Logo</Link>
      <ul className=" mr-4 space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </div>
  );
};

export default Header;
