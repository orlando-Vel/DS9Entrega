import React, { useState, useCallback } from "react";
import useGuides from "../hooks/useGuides";
import { useCart } from "../contexts/CartContext";
import { useGuide } from "../contexts/GuideContext";

const GuidesList = ({ productId }) => {
  const { filteredGuides, error } = useGuides(productId);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const { selectGuide, getSelectedGuideForProduct } = useCart();
  const { assignTripToGuide, getTripsForGuide } = useGuide();

  const handleGuideSelect = useCallback(
    (guide) => {
      const isSelected = guide.id === selectedGuideId;
      setSelectedGuideId(isSelected ? null : guide.id);
      selectGuide(productId, isSelected ? null : guide);
      if (!isSelected) {
        assignTripToGuide(guide.id, { productId });
      } else {
        // Implementar lógica para eliminar el viaje asignado al deseleccionar
      }
    },
    [selectedGuideId, selectGuide, productId, assignTripToGuide]
  );

  const selectedGuide = getSelectedGuideForProduct(productId);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Perfiles de los Guías
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className={`flex flex-col items-center bg-white shadow-lg rounded-lg p-6 space-y-4 ${
              selectedGuideId === guide.id ? "border-2 border-blue-500" : ""
            }`}
          >
            <img
              className="w-32 h-32 rounded-full object-cover mb-4"
              src={guide.image}
              alt={`${guide.firstName} ${guide.lastName}`}
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {guide.firstName} {guide.lastName}
            </h2>
            <p className="text-lg text-gray-600">Edad: {guide.age} años</p>
            <p className="text-lg text-gray-600">Teléfono: {guide.phone}</p>
            <p className="text-lg text-gray-600">Dirección: {guide.province}</p>
            <p className="text-lg text-gray-600">
              Descripción: {guide.description}
            </p>
            <input
              type="checkbox"
              checked={selectedGuideId === guide.id}
              onChange={() => handleGuideSelect(guide)}
            />
            <label className="ml-2">Seleccionar</label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-500 mt-4">
          Error fetching guides: {error.message}
        </p>
      )}
      {selectedGuide && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p className="font-bold">Guía seleccionado:</p>
          <p>{`${selectedGuide.firstName} ${selectedGuide.lastName}`}</p>
          <p>{selectedGuide.phone}</p>
          <p>{selectedGuide.province}</p>
          <p>{selectedGuide.description}</p>
        </div>
      )}
    </div>
  );
};

export default GuidesList;
