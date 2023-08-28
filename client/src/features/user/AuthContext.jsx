import { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isAuthenticated: localStorage.getItem("userInfo") ? true : false,
  status: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user/register":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case "user/login":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case "user/logout":
      localStorage.removeItem("userInfo");
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, isAuthenticated, status, error } = state;

  const getUsers = async () => {
    axios.get("/getusers").then((response) => {
      return response.data;
    });
  };

  const contextValue = { user, isAuthenticated, getUsers, dispatch };
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
