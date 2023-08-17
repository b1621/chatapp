import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./ui/Register";
import Login from "./ui/Login";
import { AuthProvider } from "./features/user/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={"hello"} />
          <Route path="register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
