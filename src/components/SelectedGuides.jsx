import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { jwtDecode } from "jwt-decode";

const SelectedGuides = () => {
  const { cartItems, getSelectedGuideForProduct } = useCart();
  const [buyerEmail, setBuyerEmail] = useState(""); // Estado para almacenar el email del comprador

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      setBuyerEmail(userEmail);
    }
  }, []);

  // Función para agrupar viajes asignados por guía
  const groupTripsByGuide = () => {
    const groupedTrips = {};
    cartItems.forEach((item) => {
      const guide = getSelectedGuideForProduct(item.id);
      if (guide) {
        const guideId = guide.id;
        if (!groupedTrips[guideId]) {
          groupedTrips[guideId] = {
            guide,
            trips: [],
            totalQuantity: 0,
          };
        }
        groupedTrips[guideId].trips.push(item.title); // Agregar título del viaje o algún identificador único del viaje
        groupedTrips[guideId].totalQuantity += item.quantity; // Sumar la cantidad de productos (personas)
      }
    });
    return groupedTrips;
  };

  const groupedTrips = groupTripsByGuide();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Viajes Asignados
      </h1>
      <p className="text-center mb-4 text-lg font-semibold">
        Comprador: <span className="text-blue-500">{buyerEmail}</span>
      </p>
      {Object.keys(groupedTrips).length === 0 ? (
        <p className="text-center">
          No hay guías seleccionados con viajes asignados
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {Object.values(groupedTrips).map((group) => (
            <div
              key={group.guide.id}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {`${group.guide.firstName} ${group.guide.lastName}`}
                </h2>
                <p className="text-lg text-gray-600">
                  Teléfono: {group.guide.phone}
                </p>
                <p className="text-lg text-gray-600">
                  Dirección: {group.guide.province}
                </p>
                <p className="text-lg text-gray-600">
                  Descripción: {group.guide.description}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Viajes Asignados:</h3>
                <ul className="list-disc list-inside">
                  {group.trips.map((trip, index) => (
                    <li key={index} className="text-gray-800">
                      {trip}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-lg">
                <span className="font-bold">Cantidad de Personas:</span>{" "}
                {group.totalQuantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedGuides;
