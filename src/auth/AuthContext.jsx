import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  
  function loginMock({ email, password }) {
    if (email === "admin@demo") {
      setUser({ email, role: "admin" });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
