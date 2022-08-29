// frontend/src/Components/Spot/HomeGallery/HomeGallery.js


// import react-redux
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';

// import css
import './HomeGallery.css';

// import HomeGallery component
const HomeGallery = () => {
  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id == spotId) : null;

  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));
  }, [dispatch]);

  return (
    spot && 
    <section className="gallery-image-container">
      <img src={spot.previewImage} alt={spot.name} />
    </section>
  );
};

// export HomeGallery component
export default HomeGallery;
