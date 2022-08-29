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

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllReviews = state => Object.values(state.reviews)[0];

// export const retrieveReviewsBySpotId = spotId => state => Object.values(state.reviews)[0].find(review => review.spotId == spotId);

/* --------- REDUCERS -------- */
const initialReviews = [];

const reviewsReducer = (state = initialReviews, action) => {
  // new reviews
  const newReviews = { ...state };

  switch (action.type) {
    //? case resetReviews:
    case RESET_REVIEWS:
      return state;
    //? default case
    default:
      return Object.assign({}, newReviews, action.reviews);
  }
};

// export reducer
export default reviewsReducer;
