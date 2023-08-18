import { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user/register":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "user/login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "user/logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      break;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, isAuthenticated, status, error } = state;

  const getUsers = async () => {
    axios.get("/").then((response) => {
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
