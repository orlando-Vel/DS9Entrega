import React from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession"; // Ajusta la importación según tu estructura

const Logout = () => {
  const { logoutUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login"); // Redirige a la página de login u otra página deseada
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Cerrar sesión
    </button>
  );
};

export default Logout;
