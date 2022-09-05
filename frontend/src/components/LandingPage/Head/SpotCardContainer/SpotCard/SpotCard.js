// frontend/src/components/SpotCardContainer/SpotCard/SpotCard.js

// import react-redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as spotActions from '../../../../../store/spots';

// import css
import './SpotCard.css';

//? Spot component
const SpotCard = () => {
  // get spots data
  const spotState = useSelector(spotActions.getAllSpots);
  const [spots, setSpots] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch])

  useEffect(() => {
    setSpots(spotState);
  }, [spotState]);

  // invoke history
  const history = useHistory();

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
                <img className="spot-image card-info" onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} src={spot.previewImage ? spot.previewImage : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"} alt={spot.name} />
                <span><i className="fa-solid fa-heart fa-lg spot-card-heart" style={{ zIndex: 2 }}></i></span>
                {/* // TODO: get average review */}
                {/* <span>{}</span> */}
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
