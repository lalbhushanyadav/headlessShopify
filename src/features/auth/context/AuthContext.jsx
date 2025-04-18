import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const getInitialState = () => {
  const stored = localStorage.getItem("auth_state");
  return stored
    ? JSON.parse(stored)
    : { user: null, isAuthenticated: false, isUserType: "frontend" };
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
        isUserType: "frontend",
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, getInitialState);

  useEffect(() => {
    localStorage.setItem("auth_state", JSON.stringify(state));
  }, [state]);
  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
