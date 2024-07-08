import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setAuthToken(token);
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
      setUserId(decodedToken.id);
    }
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const { token } = response.data;
      localStorage.setItem("userToken", token);
      setAuthToken(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserEmail(decodedToken.email);
      setUserId(decodedToken.id);
      return decodedToken;
    } catch (error) {
      setError(
        "Las credenciales proporcionadas no son correctas. Por favor, intente nuevamente."
      );
      throw new Error("Error al iniciar sesión");
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.clear();
      setAuthToken(null);
      setUserEmail(null);
      setUserId(null);
      window.location.href = "/login";
    } catch (error) {
      setError("Hubo un problema al intentar cerrar sesión.");
      throw new Error("Error al cerrar sesión");
    }
  };

  return (
    <UserContext.Provider
      value={{ error, userEmail, userId, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
