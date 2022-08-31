// frontend/src/store/reviews.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load reviews
// action
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';

// action creator: load reviews data
export const loadReviews = reviews => {
  return {
    type: LOAD_REVIEWS,
    reviews
  };
};

//? Action: Reset reviews
// action
const RESET_REVIEWS = 'reviews/RESET_REVIEWS';

// action creator: reset reviews data
export const resetReviews = () => {
  return {
    type: RESET_REVIEWS
  }
}

//? Action: Add a review
// action 
const ADD_REVIEW = 'reviews/ADD_REVIEW';

// action creator: add review
export const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  };
};

//? Action: Remove a review
// action
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// action creator: remove review
export const removeReview = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  };
};

/* --------- THUNKS -------- */
//? Thunk action to get reviews by spot id
export const getReviewsBySpotId = spotId => async dispatch => {
  // fetch all reviews by spot id
  const res = await csrfFetch(`/spots/${spotId}/reviews`);

  if (res.ok) {
    // parsed res to json
    const reviews = await res.json();

    dispatch(loadReviews(reviews));

    // return review
    return reviews;
  }
};

//? Thunk action to get a single review by spot id 
export const thunkGetReview = (spotId, reviewId) => async dispatch => {

  // fetch review by spot id
  const res = await csrfFetch(`/spots/${spotId}/reviews`);

  if (res.ok) {
    // parse res to json
    const reviews = await res.json();

    // find review by review id
    const review = reviews.find(review => review.id === Number(reviewId));

    dispatch(loadReviews(review));

    // return review
    return review;
  }
}

//? Thunk action to add review from user's input
export const thunkAddReview = (review, spotId) => async dispatch => {
  // call csrfFetch to add review with given review data
  const res = await csrfFetch(`/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  });

  if (res.ok) {
    // parsed res to json
    const postReview = await res.json();

    console.log("postReview", postReview);
    dispatch(addReview(postReview));

    // return review
    return postReview;
  }
}


//? Thunk action to remove review
export const thunkRemoveReview = reviewId => async dispatch => {
  // call csrfFetch to remove review with given reviewId
  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const destroyReview = await res.json();

    dispatch(removeReview(reviewId));

    return destroyReview;
  }
}

//? Thunk action to edit review
export const thunkEditReview = (reviewToEdit, reviewId) => async dispatch => {
  // fetch review using csrfFetch
  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(reviewToEdit)
  });

  if (res.ok) {
    // parse res to json
    const review = await res.json();

    // dispatch addSpot w/ parsed spot
    dispatch(addReview(review));

    // return review
    return review;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllReviews = state => Object.values(state.reviews)[0];

export const getReviewById = reviewId => state => state.reviews.Reviews[reviewId];

/* --------- REDUCERS -------- */
const initialReviews = [];

export const reviewsReducer = (state = initialReviews, action) => {
  // new reviews
  const newReviews = { ...state };

  switch (action.type) {
    //? case resetReviews:
    case RESET_REVIEWS:
      return state;
    //? case removeReviews
    case REMOVE_REVIEW:
      const reviews = Object.assign({}, newReviews, action.reviews);
      delete reviews.reviews[action.reviewId];
      return reviews;
    //? default case
    default:
      return Object.assign({}, newReviews, action.reviews);
  }
};

// export reducer
export default reviewsReducer;
