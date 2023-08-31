import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./ui/Register";
import Login from "./ui/Login";
import { AuthProvider } from "./features/user/AuthContext";
import { ChatProvider } from "./features/chat/ChatContext";
import Home from "./ui/Home";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./ui/Header";
import ProtectedRoute from "./component/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import ChatPage from "./features/chat/ChatPage";
// import Chat from "./features/chat/Chat";

const App = () => {
  axios.defaults.baseURL = "/api/v1/";
  axios.defaults.withCredentials = true;
  return (
    <div className=" h-screen bg-slate-900 text-white">
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <ToastContainer />
            {/* <Header /> */}
            <div className=" pt-1"></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* <Route index element={<Navigate replace to="chat" />} /> */}
                <Route path="chat" element={<ChatPage />} />
              </Route>
              <Route path="*" element={"404 not found"} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
