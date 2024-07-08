import React, { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import axiosInstance from "../axiosInstance";

const UserCrud = () => {
  const { users, error, addUser, updateUser, deleteUser } = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    identification: "",
    age: "",
    phone: "",
  });

  const initialFormData = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    identification: "",
    age: "",
    phone: "",
  };

  // Recuperar el token del localStorage al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("token:", token);
    if (token) {
      // Configurar el token en las cabeceras de axios
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, []);

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: "", // Decide si permitir editar la contraseña
      country: user.country,
      identification: user.identification,
      age: user.age.toString(),
      phone: user.phone,
    });
    setIsEditing(true);
    setEditUserId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateUser(editUserId, formData);
      } else {
        await addUser(formData);
      }
      setFormData(initialFormData);
      setIsEditing(false);
      setEditUserId(null);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditUserId(null);
    setFormData(initialFormData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

      <UserForm
        onSubmit={handleSubmit}
        initialFormData={formData}
        isEditing={isEditing}
        onCancel={handleCancel}
      />

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default UserCrud;
