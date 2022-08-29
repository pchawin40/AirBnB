// frontend/src/components/SpotCardContainer/SpotCard/SpotCard.js

// import react
import { useEffect } from "react";

// import react-redux
import { useSelector, useDispatch } from "react-redux";

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as spotActions from '../../../../../store/spots';

// import css
import './SpotCard.css';

//? Spot component
const SpotCard = () => {
  // get spots data
  const spots = useSelector(spotActions.getAllSpots);

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  //! FIX BELOW
  // TODO: Fix to get all reviews by spot id
  // const getAllReviewsBySpotId = async spotId => {
  // fetch all reviews from spot id
  // const res = await csrfFetch(`/spots/${spotId}/reviews`).then(async () => {
  //     // parse res to reviews data
  //     const reviews = await res.json();

  //     console.log("reviews", reviews);

  //     const reviewsBySpotId = reviews.filter(review => review.spotId === spotId);

  //     console.log("reviewsBySpotId", reviewsBySpotId);

  //     // return reviews
  //     return reviews;
  // }).catch(error => console.error(error));

  // };

  //? handleCardClick component
  const handleCardClick = spotId => {

    // change url to spot id clicked on
    return history.push(`/spots/${spotId}`);
  };

  // for each spot, put into card
  return (
    <>
      {/* //? Show all spots */}
      {
        spots && spots.map(spot => {
          // getAllReviewsBySpotId(spot.id);

          return (
            <div className="spot-card-content" key={spot.id} onClick={e => handleCardClick(spot.id)}>
              {/* img: image preview url */}
              <div className="spot-image-container">
                {/* // TODO: Spot favorite toggle */}
                <img className="spot-image card-info" src={spot.previewImage} alt={spot.name} />
                <span><i className="fa-solid fa-heart fa-lg spot-card-heart" style={{ zIndex: 2 }}></i></span>
              </div>

              <div className="spot-name card-info">
                {spot.name}

                {/* // TODO: Spot Review */}
                {/* //! To fix: add reviews by spot id here */}
                <span><i className="fa-solid fa-star"></i></span>
              </div>

              <div className="spot-location card-info">
                {/* longitude and latitude */}
                {spot.lat + " " + spot.lng}
              </div>

              {/* // TODO: Spot Booking Dates */}

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
