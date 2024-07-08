import React, { createContext, useState, useContext } from "react";

const GuideContext = createContext();

export const useGuide = () => {
  return useContext(GuideContext);
};

export const GuideProvider = ({ children }) => {
  const [assignedTrips, setAssignedTrips] = useState([]);

  const assignTripToGuide = (guideId, trip) => {
    console.log("Assigning trip to guide:", guideId, trip); // Añadir log para depuración
    setAssignedTrips((prevTrips) => [...prevTrips, { guideId, ...trip }]);
  };

  const getTripsForGuide = (guideId) => {
    const trips = assignedTrips.filter((trip) => trip.guideId === guideId);
    console.log(`Trips for guide ${guideId}:`, trips); // Añadir log para depuración
    return trips;
  };

  return (
    <GuideContext.Provider
      value={{
        assignedTrips,
        assignTripToGuide,
        getTripsForGuide,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};
