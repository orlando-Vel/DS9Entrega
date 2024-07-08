import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faUsers,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const TravelWithUs = () => {
  const features = [
    {
      title: "Ahorras dinero",
      description: "Te guiamos a los mejores destinos de Panama.",
      icon: faDollarSign,
    },
    {
      title: "Acompañamiento",
      description:
        "Tú conduces hacia las aventuras, nosotros te asistimos durante todo el viaje.",
      icon: faUsers,
    },
    {
      title: "Viaja seguro",
      description:
        "Garantizamos la seguridad y protección de todos nuestros clientes en todo momento y en cualquier lugar.",
      icon: faLock,
    },
  ];

  return (
    <div className="bg-blue-500 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          ¿Por qué elegirnos a <span className="text-green-500">nosotros</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <FontAwesomeIcon icon={feature.icon} className="text-6xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelWithUs;
