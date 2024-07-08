import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error } = useUser();

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      return;
    }

    try {
      await loginUser({ email, password });
      window.location.replace("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 py-2 bg-gray-200">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 py-2 bg-gray-200">
                <FontAwesomeIcon icon={faLock} className="text-gray-500" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 text-center">
              {error ||
                "Error al iniciar sesión. Por favor, intente nuevamente."}
            </p>
          )}
        </form>
        <div className="text-center">
          <p className="text-gray-700">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
