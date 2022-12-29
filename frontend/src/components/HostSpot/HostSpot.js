// import react
import { useEffect } from 'react';

// import context
import { useLandingPage } from '../../context/LandingContext';

// import component
import WelcomePage from './WelcomePage';

//? HostSpot component
const HostSpot = () => {
  /**
  * Controlled inputs
  */
  const { currentPage, setCurrentPage } = useLandingPage();

  /**
   * UseEffect
   */
  useEffect(() => {
    // set current page to host
    setCurrentPage("host");
  }, [currentPage]);

  return (
    <>
      {/* Welcome Page */}
      <WelcomePage />
    </>
  );
};

// export component
export default HostSpot;
