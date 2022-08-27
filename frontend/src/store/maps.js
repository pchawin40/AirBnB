// frontend/src/store/maps.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? action for loading api key
const LOAD_API_KEY = "maps/LOAD_API_KEY";

//? action creator to use action for loading api key
const loadApiKey = key => ({
  type: LOAD_API_KEY,
  key
});

/* --------- THUNKS -------- */

//? getKey thunk action creator
// Thunk creator to access POST / api / maps / key route
export const getKey = () => async dispatch => {

  // post fetch /api/maps/key 
  const res = await csrfFetch('/api/maps/key', {
    method: 'POST'
  });

  // parse data to json
  const data = await res.json();

  // dispatch to load the google map api key
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

/* --------- SELECTOR FUNCTIONS -------- */
// selector function to get map key
export const getMapKey = state => state.maps.key;

/* --------- REDUCERS -------- */

// initial state w/ key defaulted as null
const initialKey = { key: null };

const mapsReducer = (state = initialKey, action) => {
  switch (action.type) {
    //? LOAD_API_KEY case to load api key
    case LOAD_API_KEY:
      // fill key w/ google map key 
      return { key: action.key }
    //? default case
    default:
      return state;
  }
};

// export mapsReducer
export default mapsReducer;
