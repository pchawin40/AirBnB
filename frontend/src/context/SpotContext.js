// import react
import { useState, useContext, createContext, useEffect } from 'react';

// spot context
export const SpotContext = createContext();

// use context for spot
export const useSpot = () => useContext(SpotContext);

export default function SpotProvider({ children }) {
  // state for context
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Spot Provider
  return (
    <>
      <SpotContext.Provider
        value={{
          address, setAddress,
          city, setCity,
          state, setState,
          country, setCountry,
          lat, setLat,
          lng, setLng,
          name, setName,
          description, setDescription,
          price, setPrice
        }}
      >
        {children}
      </SpotContext.Provider>
    </>
  );
}
