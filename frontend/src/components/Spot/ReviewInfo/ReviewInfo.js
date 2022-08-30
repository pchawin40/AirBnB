// import react-redux
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../store/spots';
import * as reviewActions from '../../../store/reviews';
import * as sessionActions from '../../../store/session';

// import css
import './ReviewInfo.css';

// import component
import ReviewTracker from './ReviewTracker';
import ReviewModal from './ReviewModal';
import { Modal } from "../../../context/Modal";

//? ReviewInfo component
const ReviewInfo = () => {
  // state for review modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  // invoke dispatch
  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spots data
  const reviewState = useSelector(reviewActions.getAllReviews);
  const reviews = reviewState !== undefined ? reviewState.filter(review => review.spotId === Number(spotId)) : null;

  // get current logged in user
  const user = useSelector(sessionActions.getSessionUser);

  //! To fix page reload when deleting by using state

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
  
  //? handleReviewRemove: remove review from database
  const handleReviewRemove = review => {
    dispatch(reviewActions.thunkRemoveReview(Number(review.id)));

    window.location.reload(false);
  };

  // if review's user id is current logged in user's id, show button
  const showDeleteButton = review => {
    if (review.userId === user.id) {
      return <button className="delete-review-button" onClick={e => handleReviewRemove(review)}>Remove My Review</button>
    }
  }

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
          Array.isArray(reviews) ? reviews.map(review =>
            <li key={review.id}>
              <div>
                <img className="review-profile-image" src={`https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}`} alt={review.id} />

                {/* //? button to delete review, if available */}
                {showDeleteButton(review)}
              </div>
              <figcaption className="review-caption-container">
                <p className="review-content">{review.review}</p>
                <p className="review-author">{review.User.firstName + " " + review.User.lastName}</p>
              </figcaption>
            </li>
          ) :
            <div id="no-review-button-container">
              <li>No reviews for this spot yet. Write one now!</li>
              <button id="no-review-button" onClick={_ => setShowReviewModal(true)}><i className="fa-solid fa-circle-plus"></i></button>
            </div>
        }
      </section>

      {/* //? Button to add more reviews */}
      <section className="review-info-review-button-container">
        <button className="review-info-review-button" onClick={_ => setShowReviewModal(true)}>
          <span><i className="fa-solid fa-plus"></i></span>
          Write a review
        </button>
      </section>

      {
        // Show Review Modal
        showReviewModal
        &&
        <Modal onClose={_ => setShowReviewModal(false)}>
          <ReviewModal />
        </Modal>
      }
    </section>
  );
}


// export ReviewInfo component
export default ReviewInfo;
