import React, { createContext, useContext, useState } from "react";

export const captainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      color: "",
      number: "",
      capacity: 0,
      type: "",
    },
    // _id: "",
    rides: [],
    status: "inactive",
  });

  return (
    <captainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </captainDataContext.Provider>
  );
}

export const useCaptain = () => {
  const { captain, setCaptain } = useContext(captainDataContext);
  return { captain, setCaptain };
};

export default CaptainContext;
