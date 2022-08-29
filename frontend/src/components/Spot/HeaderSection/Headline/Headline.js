// import react-redux
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';
import * as reviewActions from '../../../../store/reviews';

// import css
import './Headline.css';

//? Headline component
const Headline = () => {
  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
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
    <section className="headline-container">
      {/* //? Headline Div 1 */}
      <div className="headline_div_1">
        <h1>{spot.name}</h1>
      </div>

      {/* //? Div 2 Inner Div 1 */}
      <div className="div_2_inner_div_1">
        {/* review by spot id */}
        <span><i className="fa-solid fa-star"></i>{isNaN(avgReview) ? 0 : avgReview}</span>

        <span>•</span>

        {/* # of reviews */}
        <span className="review-length-text">{reviews.length} reviews</span>

        {/* host type */}
        <span><i className="fa-solid fa-medal"></i> Superhost </span>

        <span>•</span>

        {/* location */}
        <span className="location-text">{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
      </div>

      {/* //? Div 2 Inner Div 2 */}
      <div className="div_2_inner_div_2">
        {/* share */}
        <span><i className="fa-solid fa-arrow-up-from-bracket"></i>Share</span>
        {/* save */}
        <span><i className="fa-regular fa-heart"></i>Save</span>
      </div>
    </section>
  );
};

// export component
export default Headline;
