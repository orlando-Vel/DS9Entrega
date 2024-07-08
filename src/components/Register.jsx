import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { addUser } = useUsers(); // No necesitas manejar 'error' aquí
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
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(formData.email)) {
      setErrorMessage("Email no válido");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      const newUser = await addUser(formData);
      setSuccessMessage("Usuario registrado exitosamente");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login"); // Redirigir después de mostrar el mensaje de éxito
      }, 3000); // Mostrar mensaje de éxito durante 3 segundos
    } catch (error) {
      setErrorMessage(
        "Error al registrar usuario. Por favor, intente nuevamente."
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
          Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lastname">
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="country">
              País
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="identification"
            >
              Documento de identidad
            </label>
            <input
              type="text"
              id="identification"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="age">
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Número de Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              required
            />
          </div>
          {showError && (
            <div className="text-red-500 text-xs mt-1 mb-4">{errorMessage}</div>
          )}
          {showSuccess && (
            <div className="text-green-500 text-xs mt-1 mb-4">
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Registrarse
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
