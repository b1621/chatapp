import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../features/user/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth", { email, password });
      toast.success("Login Success");
      console.log("login successful", response.data);

      dispatch({ type: "user/login", payload: response.data });

      navigate("/app/chat");
      // User is authenticated, perform necessary actions
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status code
        setError(error.response.data.message);
        toast.error(error.response.data.message);
        console.error("Login error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request error:", error.message);
      }
    }
  };

  return (
    <div className=" mx-auto my-16 flex w-[75%] border border-slate-800 bg-slate-900 shadow shadow-xl">
      <div className="w-full">
        <img className=" m-16" src="/login.svg" alt="" />
      </div>
      <div className="w-full border pt-10">
        <h2 className="my-3 text-center text-3xl">Login</h2>
        <form onSubmit={handleLogin} className=" mx-10 space-y-5 px-12">
          {error && <p className=" text-red-400">{error}</p>}
          {/* <div className="mx-5 flex items-center space-x-2"> */}
          <div className=" space-y-2">
            <label className=" pl-2" htmlFor="email">
              email
            </label>
            <input
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-black outline-none focus:border-sky-600"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label className=" pl-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-black outline-none focus:border-sky-600"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button
              className=" mx-10 w-fit rounded-full bg-sky-600 px-6 py-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
