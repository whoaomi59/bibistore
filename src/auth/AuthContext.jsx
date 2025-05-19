import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = sessionStorage.getItem("token");

  const logout = () => {
    sessionStorage.removeItem("token");
    return (window.location.href = "/");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
