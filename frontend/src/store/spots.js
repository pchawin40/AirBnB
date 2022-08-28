// frontend/src/store/spots.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load spots
// action
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

// action creator: load spots data
const loadSpots = spots => {
  return {
    type: LOAD_SPOTS,
    spots
  }
};

/* --------- THUNKS -------- */
//? Spot Thunk Action Creator
// thunk action to get all spots
export const getSpots = () => async dispatch => {
  // fetch all spots using csrfFetch
  const res = await csrfFetch('/spots');

  // parse res to spots data
  const spots = await res.json();

  // dispatch load spots w/ fetched spots data 
  dispatch(loadSpots(spots));

  // return spots
  return spots;
};

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllSpots = state => Object.values(state.spots)[0];

/* --------- REDUCERS -------- */
const initialSpots = [];

const spotsReducer = (state = initialSpots, action) => {
  // newSpots
  const newSpots = { ...state };

  switch (action.type) {
    //? default case
    default:
      return Object.assign({}, newSpots, action.spots);
  }
};

//export reducer
export default spotsReducer;
