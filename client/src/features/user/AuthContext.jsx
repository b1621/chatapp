import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const BASE_URL = "http://127.0.0.1:8000/api/v1/user";

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
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration error:", error);
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
