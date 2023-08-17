import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const BASE_URL = "/api/v1/user";

const initialState = {
  user: null,
  isAuthenticated: false,
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated,
  );
  const registerUser = async (userData) => {
    console.log("userData ", userData);
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  const authUser = async (userData) => {
    console.log("userData ", userData);
    try {
      const response = await axios.post(`/api/v1/user/auth`, userData);

      if (response.status === 200) {
        console.log("authentication sucess", response.data);
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        // Authentication failed, handle error
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const contextValue = { user, isAuthenticated, registerUser, authUser };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
