import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 TravelAgency. All rights reserved.</p>
          <p>Teléfono: +507 234 567 890</p>
          <p>Email: NatureInActions@travelagency.com</p>
        </div>
        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-green-500">
              Políticas de Privacidad
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-green-500">
              Términos y Condiciones
            </a>
          </li>
          <li>
            <a href="#support" className="hover:text-green-500">
              Soporte
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
