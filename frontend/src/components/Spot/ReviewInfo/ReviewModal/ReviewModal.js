// import react
import { useEffect, useState, useContext } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as reviewActions from '../../../../store/reviews';

// import component
import StarSystem from './StarSystem';

// import context
import { ReviewContext } from '../../../../context/ReviewContext';


// import css
import './ReviewModal.css';

//? ReviewModal component
const ReviewModal = ({ reviewId, reviewAction }) => {
  // invoke dispatch
  const dispatch = useDispatch();

  /**
  * Controlled Inputs:
  * ------------------
  * validationErrors: Errors from inputs
  */
  const [validationErrors, setValidationErrors] = useState([]);
  const [review, setReview] = useState("");

  const { spotId } = useParams();

  const { rating, setRating } = useContext(ReviewContext);

  // get existing review (if any)
  const currentReview = useSelector(state => state.reviews.Reviews);
  // const currentReview = Array.isArray(reviewState) ? reviewState.find(review => review.id === Number(reviewId)) : [];

  //? useEffect initial
  useEffect(() => {
    // restore review and rating
    if (currentReview) {
      setReview(currentReview.review);
      setRating(currentReview.stars);
    }
  }, [dispatch]);

  //? useEffect review
  useEffect(() => {
    setReview(review);
  }, [review])

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
    return dispatch(
      reviewAction === "edit" ?
        reviewActions.thunkEditReview(postReview, reviewId)
        :
        reviewActions.thunkAddReview(postReview, spotId)
    ).then(() => {
      // reload webpage after adding or editing is finished
      window.location.reload(false);
    }).catch(
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
        onChange={e => {
          setReview(e.target.value)

        }}
      />

      {/* //? Spot's star rating */}
        <StarSystem
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
