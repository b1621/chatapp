// import { useContext } from "react";
import { useAuth } from "../features/user/AuthContext";
import Header from "./Header";

const Home = () => {
  const { getUsers } = useAuth();
  getUsers();

  return (
    <div>
      <Header />
      <h2 className="my-10 text-center text-2xl">home page</h2>
    </div>
  );
};

export default Home;
