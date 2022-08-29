// import component
import UpperNavigation from "../LandingPage/Navigation/UpperNavigation";
// import HeaderSection from "./HeaderSection/HeaderSection";
import HeaderSection from "./HeaderSection";

//? Spot component
const Spot = ({ isLoaded }) => {
  return (
    isLoaded && (
      <>

        {/* Upper Nav Bar */}
        <UpperNavigation isLoaded={isLoaded} />

        {/* Header Section */}
        <HeaderSection />

        {/* Home Content */}

        {/* Reserve Bar */}

        {/* Lower Footer Bar */}
      </>
    )
  );
};

// export Spot 
export default Spot;
