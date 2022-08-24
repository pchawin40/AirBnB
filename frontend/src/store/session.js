// frontend/src/store/session.js

// import csrfFetch
import { csrfFetch } from "./csrf";

//?  Phase 1: Login form page
// TODO: Phase 2: Signup form page

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

  // dispatch action for setting session user
  dispatch(setSessionUser(data));

  // return response
  return res;
};

// TODO: Restore the session user
//? Setting session user to user in response body
export const restoreSessionUser = () => async dispatch => {
  // call GET /api/session
  const res = await csrfFetch('/api/session');

  // parse JSON body of response
  const user = res.json();

  // dispatch action for setting session user to user in response body
  dispatch(setSessionUser(user));

  // return response
  return res;
};

//? Signup Thunk action
export const signup = user => async dispatch => {
  // extract firstName, lastName, email, and password from given user
  const { firstName, lastName, email, password } = user;

  // hit signup backend route w/ username, email, and password inputs
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  });

  // after receiving response, parse JSON body of response
  const signupUser = res.json();

  // dispatch action for setting session user to user in response's body
  dispatch(setSessionUser(signupUser));

  // return response
  return res;
};

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
};

export default sessionReducer;
