// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../store/spots';

// import component
import UpperNavigation from "../LandingPage/Navigation/UpperNavigation";
import HeaderSection from "./HeaderSection";
import HomeContent from './HomeContent/HomeContent';
import ReviewInfo from "./ReviewInfo";
import SpotFooter from "./SpotFooter";

// import css
import './Spot.css';
import HomeFooterBar from '../LandingPage/HomeFooterBar';

//? Spot component
const Spot = ({ isLoaded }) => {

  // invoke dispatch
  const dispatch = useDispatch();

  // get spotId
  const { spotId } = useParams();

  // get current spot first 
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : {};

  // useEffect for dispatch (initial render)
  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));

    return () => {
      dispatch(spotActions.resetSpot());
    };
  }, [dispatch, spotId]);

  return (
    isLoaded && (
      <>

        {/* Upper Nav Bar */}
        <UpperNavigation isLoaded={isLoaded} />

        <div className="spot-sections-container">
          {/* Header Section */}
          <HeaderSection />

          {/* Home Content */}
          <HomeContent />

          {/* Review Content */}
          {/* //? Review */}
          <ReviewInfo spot={spot} />

          {/* Reserve Bar */}
        </div>

        {/* Lower Footer Bar */}
        {/* //? Lower Footer */}
        <HomeFooterBar mapShow={true} />
        {/* <SpotFooter className="spot-footer-container" /> */}
      </>
    )
  );
};

// export Spot 
export default Spot;
