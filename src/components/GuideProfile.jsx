import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const GuideProfile = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axiosInstance.get("/guides");
        setGuides(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading guides: {error.message}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        Perfiles de los Guías
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 space-y-4"
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
            <p className="text-lg text-gray-600">Dirección: {guide.address}</p>
            <p className="text-lg text-gray-600">
              Descripción: {guide.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideProfile;
