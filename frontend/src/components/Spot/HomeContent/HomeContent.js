// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import css
import './HomeContent.css';

// import store
import * as userActions from '../../../store/users';
import * as spotActions from '../../../store/spots';

import { useState } from 'react';

//? HomeContent component
const HomeContent = () => {

  // invoke dispatch
  const dispatch = useDispatch();

  // get spotId
  const { spotId } = useParams();

  // get current spot first 
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : {};

  // spot owner
  const spotOwner = useSelector(spotActions.getSpotOwner());

  // useEffect for dispatch (initial render)
  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));

    return () => {
      dispatch(spotActions.resetSpot());
    };
  }, [dispatch, spotId]);

  return (
    spot && spotOwner &&
    <>
      {/* Title */}
      <section className="home-content-section-container">
        <section className="home-content-title-section">
          <p>Home hosted by <span>{spotOwner.firstName} {spotOwner.lastName}</span></p>

          {/* include user image */}


          <p>2 guests • 1 bed • 0 baths</p>
        </section>
      </section>
    </>
  );
}

// export component
export default HomeContent;
