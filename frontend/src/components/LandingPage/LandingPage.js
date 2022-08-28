// frontend/src/components/LandingPage/LandingPage.js

import Navigation from './Navigation';
import MapContainer from './MapContainer';
import Head from './Head';
import HomeFooterBar from './HomeFooterBar';

const LandingPage = ({ isLoaded }) => 
(
  <>
    {/* //? Navigation */}
    <Navigation isLoaded={isLoaded} />

    {/* //? Content */}
    {/* //* Head */}
    <Head />
    {/* //* MapContainer */}
    <MapContainer />

    {/* //? HomeFooterBar */}
    <HomeFooterBar />
  </>
)
; 

export default LandingPage;
