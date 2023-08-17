import { useState } from "react";
import { useAuth } from "../features/user/AuthContext";

const Login = () => {
  const { authUser } = useAuth();

  // Initialize state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  // Update form input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Access form input values from formData
    const { name, password } = formData;

    // Now you can use 'name' and 'password' in your authentication logic
    console.log("Name:", name);
    console.log("Password:", password);

    // Call your authentication function with the form values
    authUser(name, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          className="border"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
