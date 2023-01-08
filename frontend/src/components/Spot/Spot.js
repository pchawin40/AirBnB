// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../store/spots';
import * as bookingActions from '../../store/bookings';
import * as sessionActions from '../../store/session';

// import component
import UpperNavigation from "../LandingPage/Navigation/UpperNavigation";
import HeaderSection from "./HeaderSection";
import HomeContent from './HomeContent/HomeContent';
import ReviewInfo from "./ReviewInfo";
import SpotFooter from "./SpotFooter";
import HomeFooterBar from '../LandingPage/HomeFooterBar';

// import css
import './Spot.css';

// import context
import { useSpot } from '../../context/SpotContext';
import { useReview } from '../../context/ReviewContext';
import { useLandingPage } from '../../context/LandingContext';

// import store
import { getAverageReviews } from '../../store/reviews';

//? Spot component
const Spot = ({ isLoaded }) => {

  // invoke dispatch
  const dispatch = useDispatch();

  // get spotId
  const { spotId } = useParams();

  /** 
   * Controlled inputs
   */
  // get all available spots 
  const { spots, setSpots } = useSpot();
  // control current spot id
  const { currentSpotId, setCurrentSpotId } = useReview();
  // control average review for current spot
  const { avgReview, setAvgReview } = useReview();
  // control current page
  const { currentPage, setCurrentPage } = useLandingPage();

  /**
   * Selector functions
   */
  const averageReviews = useSelector(getAverageReviews(spotId));
  const currentUser = useSelector(sessionActions.getSessionUser);

  /**
   * UseEffect
  */
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : {};

  // per general
  useEffect(() => {
    // if spotId exists, set spotId as current spot id
    if (spotId) {
      setCurrentSpotId(spotId);
    }

    //?set average review
    setAvgReview(averageReviews);

    // call to dispatch to get booking
    dispatch(bookingActions.thunkGetUserBookings());
  }, [dispatch, spotId, spots, spot, currentSpotId]);

  // per current page
  useEffect(() => {
    // set current page to spot
    setCurrentPage('spot');
  }, [currentPage]);

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
