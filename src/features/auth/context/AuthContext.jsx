import React, { createContext, useContext, useReducer, useEffect } from "react";
import Messages from "../../../shared/Utils/Message";
const AuthContext = createContext();
const defaultUserType = Messages.User.normalUser;

const getInitialState = () => {
  const stored = localStorage.getItem("session_data");
  return stored
    ? JSON.parse(stored)
    : { user: null, isAuthenticated: false, isUserType: defaultUserType };
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isUserType: action.payload.userType,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isUserType: defaultUserType,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, getInitialState);

  useEffect(() => {
    localStorage.setItem("session_data", JSON.stringify(state));
  }, [state]);
  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
