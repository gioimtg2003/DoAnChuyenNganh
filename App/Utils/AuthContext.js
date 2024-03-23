import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  console.log("UserEmail: ", userEmail);
  const login = (email, token) => {
    setUserEmail(email);
    setAccessToken(token);
  };

  const logout = () => {
    setUserEmail(null);
    setAccessToken(null)
  };

  return (
    <AuthContext.Provider value={{ userEmail, access_token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Xuất AuthContext để có thể sử dụng ở bên ngoài