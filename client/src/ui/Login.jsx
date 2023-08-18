import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth", { email, password });
      toast.success("Login Success");
      console.log("login successful", response.data);
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
    <div className="border">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p className=" text-red-400">{error}</p>}
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
