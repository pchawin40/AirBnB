// frontend/src/store/session.js

// import csrfFetch
import { csrfFetch } from "./csrf";

// TODO: Phase 1: Login form page

/* --------- ACTIONS -------- */
//? Action: Set session user
// action
const SET_SESSION_USER = 'session/SET_SESSION_USER';

// action creator: set session user to action creator's input parameter 
const setSessionUser = user => {
  return {
    type: SET_SESSION_USER,
    user
  };
};

//? Action: Remove session user
// action
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

// action creator: remove session user
export const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER
  };
};

/* --------- THUNKS -------- */
// call api to login then set session user from response
export const login = user => async dispatch => {
  // extract credential and password from given user
  const { credential, password } = user;

  // use custom csrfFetch to fetch /api/session
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      email: credential,
      password
    })
  });

  // parse res to JSON 
  const data = await res.json();

  console.log("data.user", data);

  // dispatch action for setting session user
  dispatch(setSessionUser(data));

  // return response
  return res;
}

// log current user out by dispatching removeSessionUser
export const logout = () => async dispatch => dispatch(removeSessionUser());

/* --------- SELECTOR FUNCTIONS -------- */
export const getSessionUser = state => state.session.user;

/* --------- REDUCERS -------- */

// if there is no session user, set null attribute to user key as default value
const initialUser = {
  user: null
};

const sessionReducer = (state = initialUser, action) => {
  // make new session
  const newSession = { ...state };

  switch (action.type) {
    //? setSessionUser
    case SET_SESSION_USER:
      // replace current user with given user
      newSession["user"] = action.user;

      // return new session
      return newSession;
    //? removeSessionUser
    case REMOVE_SESSION_USER:
      // set user to null
      newSession["user"] = null;
      
      // return new session
      return newSession;
    //? default
    default:
      return state;
  }
}

export default sessionReducer;
