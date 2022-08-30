// import react-redux
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../store/spots';
import * as reviewActions from '../../../store/reviews';

// import css
import './ReviewInfo.css';

// import component
import ReviewTracker from './ReviewTracker';

//? ReviewInfo component
const ReviewInfo = () => {
  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spots data
  const reviewState = useSelector(reviewActions.getAllReviews);
  const reviews = reviewState !== undefined ? reviewState.filter(review => review.spotId === Number(spotId)) : null;

  // get average of all reviews from review
  // total / #

  let avgReview = 0;

  if (reviews) {
    let sumReviews = 0;

    reviews.forEach(review => sumReviews += review.stars);

    avgReview = parseFloat(sumReviews / reviews.length).toFixed(2);
  }

  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(Number(spotId)));
    dispatch(reviewActions.getReviewsBySpotId(Number(spotId)));
  }, [dispatch, spotId]);


  return (
    <section className="review-info">
      {/* //? review header */}
      <header className="review-info-header-container">
        <span><i className="fa-solid fa-star"></i></span>
        {/* avgReviews */}
        <span>{isNaN(avgReview) ? 0 : avgReview}</span>

        <span>·</span>

        {/* num of reviews */}
        <span id="review-info-num-reviews">{reviews ? reviews.length : 0} reviews</span>
      </header>

      {/* //? review tracker */}
      <section className="review-info-tracker-container">
        <ReviewTracker />
      </section>

      {/* //? top reviews */}
      <section className="review-info-feature-container">
        {
          reviews ? reviews.map(review =>
            <li key={review.id}>
              <div>
                <img src={`https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}`} />
              </div>
              {review.review}
            </li>
          ) :
            <div id="no-review-button-container">
              <li>No reviews for this spot yet. Write one now!</li>
              <button id="no-review-button"><i class="fa-solid fa-circle-plus"></i></button>
            </div>
        }
      </section>

      {/* //? Button to add more reviews */}
      <section className="review-info-review-button-container">
        <button className="review-info-review-button">
          <span><i class="fa-solid fa-plus"></i></span>
          Write a review
        </button>
      </section>
    </section>
  );
}


// export ReviewInfo component
export default ReviewInfo;
