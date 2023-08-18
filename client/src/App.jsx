import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./ui/Register";
import Login from "./ui/Login";
import { AuthProvider } from "./features/user/AuthContext";
import Home from "./ui/Home";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./ui/Header";
import ProtectedRoute from "./component/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Chat from "./features/chat/Chat";

const App = () => {
  axios.defaults.baseURL = "/api/v1/user";
  axios.defaults.withCredentials = true;
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Navigate replace to="chat" />} /> */}
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
