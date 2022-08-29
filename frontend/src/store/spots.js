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

//? Action: Add spot
// action
const ADD_SPOT = 'spots/ADD_SPOT';

// action creator: add spot data
const addSpot = spot => {
  return {
    type: ADD_SPOT,
    spot
  }
}

/* --------- THUNKS -------- */
//? Thunk action to get all spots
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

//? Thunk action to post spot
export const addASpot = spotToAdd => async dispatch => {
  console.log("something");
  // fetch all spots using csrfFetch
  const res = await csrfFetch('/spots', {
    method: 'POST',
    body: JSON.stringify(spotToAdd)
  });

  const spot = await res.json();

  dispatch(addSpot(spot));

  return spot;
}


/* --------- SELECTOR FUNCTIONS -------- */
export const getAllSpots = state => Object.values(state.spots)[0];

/* --------- REDUCERS -------- */
const initialSpots = [];

const spotsReducer = (state = initialSpots, action) => {
  // newSpots
  const newSpots = { ...state };

  switch (action.type) {
    //? case: add a spot
    case ADD_SPOT:
      return Object.assign({}, newSpots, action.spot);
    //? default case
    default:
      return Object.assign({}, newSpots, action.spots);
  }
};

//export reducer
export default spotsReducer;
