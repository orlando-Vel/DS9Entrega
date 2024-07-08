import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapMarkedAlt,
  faSignInAlt,
  faSignOutAlt,
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../contexts/UserContext"; // Importar el hook useUser

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser } = useUser(); // Utilizar el contexto useUser
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg p-4 fixed w-full top-0 z-10 rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold flex items-center">
          <Link to="/">
            <img
              src="logo2.png"
              alt="Company Logo"
              className="h-8 inline-block mr-2"
            />
            <span className="hidden sm:inline-block">Nature In Action</span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>
          <ul
            className={`flex-col lg:flex-row lg:flex lg:space-x-4 text-black text-lg font-semibold ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <li className="flex items-center py-2 lg:py-0">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <Link to="/" className="hover:text-green-500">
                Inicio
              </Link>
            </li>
            <li className="flex items-center py-2 lg:py-0">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
              <Link to="/packages" className="hover:text-green-500">
                Paquetes
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="flex items-center py-2 lg:py-0">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                <button onClick={handleLogout} className="hover:text-green-500">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="flex items-center py-2 lg:py-0">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  <Link to="/login" className="hover:text-green-500">
                    Login
                  </Link>
                </li>
                <li className="flex items-center py-2 lg:py-0">
                  <Link to="/register" className="hover:text-green-500">
                    Regístrate
                  </Link>
                </li>
              </>
            )}
          </ul>
          <Link to="/shoppingcart" className="text-black ml-4">
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
