// import react-redux
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';
import * as reviewActions from '../../../../store/reviews';

//? Headline component
const Headline = () => {
  const dispatch = useDispatch();
  
  // get spot id
  const { spotId } = useParams();
  
  // const spotState = useSelector(spotActions.getAllSpots);
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id == spotId) : null;

  // get spots data
  const reviewState = useSelector(reviewActions.getAllReviews);
  const reviews = reviewState !== undefined ? reviewState.filter(review => review.spotId == spotId) : null;

  // get average of all reviews from review
  // total / #

  let avgReview = 0;

  if (reviews) {
    let sumReviews = 0;
    
    reviews.forEach(review => sumReviews += review.stars);

    avgReview = sumReviews / reviews.length;
  }


  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));
    dispatch(reviewActions.getReviewsBySpotId(spotId));
  }, [dispatch]);

  // get spot by spot id
  return (
    // if spot is available, return spot
    spot && reviews && 
    <>
      <div className="headline_div_1">
        {spot.name}
      </div>
      <div className="headline_div_2">
        <div className="div_2_inner_div_1">
          {/* review by spot id */}
          <h1>{avgReview}</h1>

          {/* # of reviews */}
          <h1>{reviews.length}</h1>

          {/* location */}
        </div>

        <div className="div_2_inner_div_2">
          {/* share */}
          {/* save */}
        </div>
      </div>
    </>
  );
};

// export component
export default Headline;
