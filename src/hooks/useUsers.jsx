import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  //esto maneja las solicitudes y si algo sale mal muestra el error
  const handleRequest = async (requestFunction, ...args) => {
    try {
      const response = await requestFunction(...args);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Error en la solicitud");
    }
  };

  //añadir un usuario
  const addUser = async (userData) => {
    try {
      const newUser = await handleRequest(
        axiosInstance.post,
        "/users",
        userData
      );
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  //actualizar un usuario
  const updateUser = async (id, updatedUserData) => {
    try {
      const updatedUser = await handleRequest(
        axiosInstance.patch,
        `/users/${id}`,
        updatedUserData
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? updatedUser : user))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  //eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await handleRequest(axiosInstance.delete, `/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return { users, error, addUser, updateUser, deleteUser };
};

export default useUsers;
