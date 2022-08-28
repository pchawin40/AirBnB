// frontend/src/store/reviews.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load reviews
// action
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';

// action creator: load reviews data
const loadReviews = reviews => {
  return {
    type: LOAD_REVIEWS,
    reviews
  };
};

/* --------- THUNKS -------- */

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllReviews = state => Object.values(state.reviews);


/* --------- REDUCERS -------- */
const initialReviews = [];

const reviewsReducer = (state = initialReviews, action) => {
  // new reviews
  const newReviews = { ...state };

  switch (action.type) {
    //? default case
    default:
      return Object.assign({}, newReviews, action.reviews);
  }
};

// export reducer
export default reviewsReducer;
