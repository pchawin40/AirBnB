// frontend/src/store/spots.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load spots
// action
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

// action creator: load spots data
export const loadSpots = spots => {
  return {
    type: LOAD_SPOTS,
    spots
  }
};

//? Action: Add spot
// action
const ADD_SPOT = 'spots/ADD_SPOT';

// action creator: add spot data
export const addSpot = spot => {
  return {
    type: ADD_SPOT,
    spot
  }
}

//? Action: Reset Spots
// action 
const RESET_SPOT = '/spots/RESET_SPOT';

// action creator: reset spots data
export const resetSpot = () => {
  return {
    type: RESET_SPOT
  }
}

/* --------- THUNKS -------- */
//? Thunk action to get all spots
export const getSpots = () => async dispatch => {
  // fetch all spots using csrfFetch
  const res = await csrfFetch('/spots');

  if (res.ok) {
    // parse res to spots data
    const spots = await res.json();
  
    // dispatch load spots w/ fetched spots data 
    dispatch(loadSpots(spots));
  
    // return spots
    return spots;
  }
};

export const getSpotBySpotId = spotId => async dispatch => {
  const res = await csrfFetch(`/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();

    dispatch(loadSpots(spot));

    return spot;
  }
};

//? Thunk action to post spot
export const addASpot = spotToAdd => async dispatch => {
  // fetch all spots using csrfFetch
  const res = await csrfFetch('/spots', {
    method: 'POST',
    body: JSON.stringify(spotToAdd)
  });

  if (res.ok) {
    // parsed res to json
    const spot = await res.json();
  
    // dispatch addSpot w/ parsed spot
    dispatch(addSpot(spot));
  
    // return spot
    return spot;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllSpots = state => Object.values(state.spots)[0];

export const getSpotById = spotId => state => Object.values(state.spots.Spots).find(spot => spot.id === Number(spotId));

export const getSpotOwner = () => state => state.spots.Owners ? state.spots.Owners : state.spots;

/* --------- REDUCERS -------- */
const initialSpots = [];

const spotsReducer = (state = initialSpots, action) => {
  // newSpots
  const newSpots = { ...state };

  switch (action.type) {
    //? case: add a spot
    case ADD_SPOT:
      return Object.assign({}, newSpots, action.spot);
    //? case: reset spot
    case RESET_SPOT:
      return state;
    //? default case
    default:
      return Object.assign({}, newSpots, action.spots);
  }
};

//export reducer
export default spotsReducer;
