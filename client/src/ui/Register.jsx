import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";
// import { useAuth } from "../features/user/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { dispatch, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      dispatch({ type: "user/register", payload: response.data });

      toast.success("Registration Success");
      console.log("login successful", response.data);
      navigate("/app/chat");
      // User is authenticated, perform necessary actions
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status code

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

  useEffect(() => {
    // console.log("isAuthenticated ", isAuthenticated);
    if (isAuthenticated) navigate("/app/chat");
  }, [navigate, isAuthenticated]);
  return (
    <div className=" mx-auto my-16 flex w-[75%] rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="w-full py-10">
        <h2 className="my-3 mb-10 text-center text-4xl font-semibold">
          Register
        </h2>

        <form onSubmit={handleSubmit} className=" mx-5 space-y-5 px-12">
          <div className=" space-y-2">
            {/* <label className=" pl-2  text-xs" htmlFor="name">
              name
            </label> */}
            <input
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-black outline-none focus:border-sky-600"
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" space-y-2">
            {/* <label className=" pl-2  text-xs" htmlFor="email">
              email
            </label> */}
            <input
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-600"
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className=" space-y-2">
            {/* <label className=" pl-2  text-xs" htmlFor="password">
              Password
            </label> */}
            <input
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-black outline-none focus:border-sky-600"
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" space-y-2">
            {/* <label className=" pl-2  text-xs" htmlFor="confirmPassword">
              Confirm Password
            </label> */}
            <input
              placeholder="confirm password"
              className="bg w-full rounded-full border border-slate-900 bg-slate-800 px-4 py-3 text-sm text-black outline-none focus:border-sky-600"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className=" pl-2 text-xs">
            Have an account?{" "}
            <span className=" text-sky-500 hover:text-sky-600">
              <Link to="/login">login</Link>{" "}
            </span>
          </p>
          <div className="flex w-full justify-center ">
            <button
              className=" rounded-full bg-sky-600  px-6 py-2 "
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="w-full">
        <img
          className=" my-16 h-96"
          src="/undraw_thought_process_re_om58.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
