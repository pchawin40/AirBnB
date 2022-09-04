// import react
import { useState, useContext, createContext } from 'react';

// spot context
export const LandingContext = createContext();

// use context for spot
export const useLandingPage = () => useContext(LandingContext);

export default function LandingProvider({ children }) {
  // state for context
  const [isLoaded, setIsLoaded] = useState(false);
  // Become a host (if not logged in)
  const [userHostLinks, setUserHostLinks] = useState(<></>);
  // get user's name
  const [user, setUser] = useState(<></>);
  // When no session user, contain links to login and sign up
  const [sessionLinks, setSessionLinks] = useState(<></>);

  // Landing Provider
  return (
    <>
      <LandingContext.Provider
        value={{
          isLoaded, setIsLoaded,
          userHostLinks, setUserHostLinks,
          user, setUser,
          sessionLinks, setSessionLinks
        }}
      >
        {children}
      </LandingContext.Provider>
    </>
  );
}
