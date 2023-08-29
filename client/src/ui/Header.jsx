import { Link } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";

const Header = () => {
  const { user, isAuthenticated, dispatch } = useAuth();
  // console.log("users data", user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "user/logout" });
  };
  return (
    <div className=" flex items-center justify-between  py-2">
      <Link to="/app/chat">Logo</Link>
      {isAuthenticated ? (
        <ul className="mr-4 space-x-4">
          <Link>Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      ) : (
        <ul className=" mr-4 space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </ul>
      )}
    </div>
  );
};

export default Header;
