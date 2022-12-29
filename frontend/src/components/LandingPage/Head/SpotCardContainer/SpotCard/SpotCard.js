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

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    dispatch(reviewActions.thunkGetReviews());
  }, [spots]);

  /**
   * Handler functions
   */
  //? handleCardClick component
  const handleCardClick = spotId => {

    // change url to spot id clicked on
    return history.push(`/rooms/${spotId}`);
  };

  // for each spot, put into card
  return (
    <>
      {/* //? Show all spots */}
      {
        spots && spots.map(spot => {

          // if review is ready to be check...
          const currentSpotReviews =
            // filter out all reviews by current spot id
            allReviews
              .filter(review => review.spotId === spot.id)
              .map(review => review.stars)
              .reduce((prevSum, currSum) => prevSum += currSum, 0);

          // divide by length of all reviews by current spot
          // save variable to be pass in as average spot reviews
          const currentAvgSpotReviews = (
            currentSpotReviews
            /
            allReviews
              .filter(review => review.spotId === spot.id).length
          );

          return (
            <div className="spot-card-content" key={spot.id} onClick={e => handleCardClick(spot.id)}>
              {/* img: image preview url */}
              <div className="spot-image-container">
                {/* // TODO: Spot favorite toggle */}
                <img className="spot-image card-info" onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} src={spot.previewImage ? spot.previewImage : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} alt={spot.name} />
                {/* <span><i className="fa-solid fa-heart fa-lg spot-card-heart" style={{ zIndex: 2 }}></i></span> */}
                {/* // TODO: get average review */}
              </div>

              <div className="spot-header card-info">
                <div className="card-info-container-1">
                  {/* City, Country */}
                  <span>{spot.city}</span>
                  <span>, &nbsp;</span>
                  <span>{spot.country.toUpperCase().includes("america".toUpperCase()) ? spot.state : spot.country}&nbsp;</span>
                </div>

                <div className="card-info-container-2">
                  {/* // //? Spot Review */}
                  <span>{isNaN(currentAvgSpotReviews) ? 0 : currentAvgSpotReviews}</span>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="spot-location card-info">
                {/* name */}
                {spot.name}
              </div>

              <div className="spot-price card-info">
                {
                  spot.locationType
                }
                &nbsp;
                |
                &nbsp;
                <span>${spot.price}</span>&nbsp;
                {
                  spot.locationType === 'Stays'
                    ?
                    <>
                      night
                    </>
                    :
                    <>
                      experience
                    </>
                }
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
