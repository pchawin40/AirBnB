// frontend/src/components/LandingPage/LandingPage.js

import Navigation from './Navigation';
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

    {/* //? HomeFooterBar */}
    <HomeFooterBar mapState={true} />
  </>
)
; 

export default LandingPage;
