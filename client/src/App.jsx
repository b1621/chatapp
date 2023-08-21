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
    <div className=" h-screen bg-slate-900 text-white">
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          {/* <Header /> */}
          <div className="hidden py-2"></div>
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
            <Route path="*" element={"404 not found"} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
