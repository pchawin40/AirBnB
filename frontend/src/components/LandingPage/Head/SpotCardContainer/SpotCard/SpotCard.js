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

//? Spot component
const SpotCard = () => {
  // get spots data
  const spotState = useSelector(spotActions.getAllSpots);
  const [spots, setSpots] = useState([]);

  // review state
  const reviewState = useSelector(state => state.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch])

  useEffect(() => {
    setSpots(spotState);
    if (spots) {
      dispatch(reviewActions.thunkGetReviews(spots));
    }
  }, [spotState]);

  //? get avgReview
  const findAvgReviews = (reviews, spotId) => {
    // if Reviews exist in given reviews
    if (reviews.Reviews) {
      // define variable to use for summing up and averaging reviews
      let sumReviews = 0;
      const reviewsToSum = [];
      Object.values(reviews.Reviews).map(review => reviewsToSum.push(...review[0]));

      // add all relevant stars
      reviewsToSum.map(review => {
        if (review.spotId === spotId) {
          sumReviews += review.stars;
        }
      });

      // get length of all reviews by spot id
      const allReviewsByCurrentSpot = reviewsToSum.filter(review => review.spotId === spotId);

      // return average of reviews
      return parseFloat(sumReviews / allReviewsByCurrentSpot.length).toFixed(2);
    }
  }

  // invoke history
  const history = useHistory();

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

          let avgReview;

          if (reviewState) {
            avgReview = findAvgReviews(reviewState, spot.id);
          }

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
                  <span>{isNaN(avgReview) ? 0 : avgReview}</span>
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
