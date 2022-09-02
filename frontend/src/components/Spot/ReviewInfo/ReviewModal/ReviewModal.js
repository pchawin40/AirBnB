// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as reviewActions from '../../../../store/reviews';

// import component
import StarSystem from './StarSystem';

// import css
import './ReviewModal.css';

//? ReviewModal component
const ReviewModal = ({ reviewId }) => {
  // invoke dispatch
  const dispatch = useDispatch();

  /**
  * Controlled Inputs:
  * ------------------
  * review: User's reviews for spot
  * rating: User's rating for spot
  * hover: hover state for rating
  * validationErrors: Errors from inputs
  */
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);

  // get existing review (if any)
  const reviewState = useSelector(reviewActions.getAllReviews);
  const currentReview = Array.isArray(reviewState) ? reviewState.find(review => review.id === Number(reviewId)) : [];

  useEffect(() => {
    // restore review and rating
    setReview(currentReview.review);
    setRating(currentReview.stars);
  }, [dispatch, currentReview.review, currentReview.stars]);

  //? HandleReviewSubmit
  const handleReviewSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // review to submit
    const postReview = {
      ...currentReview,
      review,
      stars: rating
    };

    // reset validation erros before dispatching
    setValidationErrors([]);




    // dispatch add review thunk action
    return dispatch(reviewActions.thunkEditReview(postReview, reviewId)).catch(
      async res => {
        // parse data
        const data = await res.json();

        // set any error data into validation errors
        if (data.message) setValidationErrors([data.message]);
      }
    );
  }

  return (
    <form id="review-form" onSubmit={handleReviewSubmit}>
      {/* //? Display Errors (if any) */}
      <ul>
        {
          Array.isArray(validationErrors) ?
            validationErrors.map(error => <li key={error} className="error-list">{error}</li>)
            :
            ""
        }
      </ul>

      {/* //? Spot's review */}
      <label id="spot-review-label" htmlFor="spot-review">Tell us your review:</label>
      <textarea
        id="spot-review"
        name="spot-review"
        value={review}
        onChange={e => setReview(e.target.value)}
      />

      {/* //? Spot's star rating */}
      <StarSystem
        rating={rating}
        hover={hover}
        setRating={setRating}
        setHover={setHover}
      />

      {/* //? Submit Review Button */}
      <button id="submit-review-button" type="submit">
        Submit Review
      </button>
    </form>
  );
};

// export component
export default ReviewModal;
