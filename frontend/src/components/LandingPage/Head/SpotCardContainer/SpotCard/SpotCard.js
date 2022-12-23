// frontend/src/components/SpotCardContainer/SpotCard/SpotCard.js

// import react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as spotActions from '../../../../../store/spots';
import * as reviewActions from '../../../../../store/reviews';

// import css
import './SpotCard.css';

// import context
import { useReview } from "../../../../../context/ReviewContext";
import { useSpot } from "../../../../../context/SpotContext";

//? Spot component
const SpotCard = () => {

  /**
   * Controlled inputs
   */
  // get spots data
  const { spots, setSpots } = useSpot();
  const { avgReview, setAvgReview } = useReview();

  /**
   * Selector functions
   */
  const allReviews = useSelector(reviewActions.getAllReviews);
  // get all available reviews
  const averageReviews = useSelector(reviewActions.getAverageReviews);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [spots]);

  // invoke history
  const history = useHistory();

  /**
   * Handler functions
   */
  //? handleCardClick component
  const handleCardClick = spotId => {

    // change url to spot id clicked on
    return history.push(`/rooms/${spotId}`);
  };

  // check if review is ready to be loaded
  const checkReviewsReady = () => {
    return (
      Array.isArray(allReviews)
      &&
      allReviews.length > 0
    );
  }

  // for each spot, put into card
  return (
    <>
      {/* //? Show all spots */}
      {
        spots && spots.map(spot => {

          // if review is ready to be check...
          const currentSpotReviews =
          checkReviewsReady()
          ?
          // filter out all reviews by current spot id
          allReviews.filter(review => {
            // if review exist, return matching spot id. otherwise, false
            return review ? review.spotId === spot.id : false;
          }).map(review => review.stars)
            // sum up all review ratings
            .reduce((prevSum, currSum) => prevSum += currSum, 0)
              :
              0;

          // divide by length of all reviews by current spot
          // save variable to be pass in as average spot reviews
          const currentAvgSpotReviews = currentSpotReviews / allReviews.length;

          return (
            <div className="spot-card-content" key={spot.id} onClick={e => handleCardClick(spot.id)}>
              {/* img: image preview url */}
              <div className="spot-image-container">
                {/* // TODO: Spot favorite toggle */}
                <img className="spot-image card-info" onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} src={spot.previewImage ? spot.previewImage : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} alt={spot.name} />
                <span><i className="fa-solid fa-heart fa-lg spot-card-heart" style={{ zIndex: 2 }}></i></span>
                {/* // TODO: get average review */}
              </div>

              <div className="spot-header card-info">
                <div className="card-info-container-1">
                  {/* City, Country */}
                  <span>{spot.city}</span>
                  <span>, </span>
                  <span>{spot.country.toUpperCase().includes("america".toUpperCase()) ? spot.state : spot.country}</span>
                </div>

                <div className="card-info-container-2">
                  {/* // //? Spot Review */}
                  <span>{isNaN(currentAvgSpotReviews) ? 0 : currentAvgSpotReviews}</span>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="spot-location card-info">
                {/* longitude and latitude */}
                {"lat: " + spot.lat + " " + "lng: " + spot.lng}
              </div>

              <div className="spot-price card-info">
                <span>${spot.price}</span> night
              </div>
            </div>
          )
        }
        )}
    </>
  );
};

// export SpotCard component
export default SpotCard;
