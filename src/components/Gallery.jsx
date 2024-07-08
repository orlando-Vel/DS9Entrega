import React from "react";
import destinationsData from "../data/DestinationsData.json";
import { Link } from "react-router-dom";

const Gallery = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-4">
          Hermosos y emocionantes{" "}
          <span className="text-green-500">Destinos</span>
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Experiencias únicas con Nature in Actions, Panamá.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinationsData.map((destination) => (
            <div key={destination.id} className="flex flex-col items-center">
              <Link to="/packages">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg shadow-lg"
                />
              </Link>
              <h3 className="text-xl font-bold text-gray-800">
                {destination.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
