import { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Make API request to authenticate user
    try {
      const response = await fetch("/api/v1/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // User is authenticated, perform necessary actions
      const data = await response.json();
      console.log(data); // Do something with the response data
    } catch (error) {
      console.log(error);
      if (error.message) {
        console.log(error.message);
      }
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        console.log("error message = ", errorMessage);
      }
      console.log(error);
    }
  };

  return (
    <div className="border">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
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
