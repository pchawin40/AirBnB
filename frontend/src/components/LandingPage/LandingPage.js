// frontend/src/components/LandingPage/LandingPage.js

import Navigation from './Navigation';
import Head from './Head';
import HomeFooterBar from './HomeFooterBar';
import { useLandingPage } from '../../context/LandingContext';
import { useEffect } from 'react';

const LandingPage = ({ isLoaded }) => {
  /**
   * Controlled inputs
   */
  const { currentPage, setCurrentPage } = useLandingPage();

  /**
   * UseEffect
   */
  useEffect(() => {
    // set current page to landing
    setCurrentPage("landing");
  }, [currentPage]);

  return (
    (
      <>
        {/* //? Navigation */}
        <Navigation isLoaded={isLoaded} />

        {/* //? Content */}
        {/* //* Head */}
        <Head />

        {/* //? HomeFooterBar */}
        <HomeFooterBar mapState={true} />
      </>
    )
  );
};

export default LandingPage;
