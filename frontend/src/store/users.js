// import csrfFetch
import { csrfFetch } from "./csrf";

/* --------- ACTIONS -------- */
//? Load User
// action
const LOAD_USERS = "users/LOAD_USERS";

// action creator: load all users
export const loadUsers = users => {
  return {
    type: LOAD_USERS,
    users
  };
};

//? Reset Users
// action
const RESET_USERS = "users/RESET_USERS";

// action creator: reset all users
export const resetUsers = () => {
  return {
    type: RESET_USERS
  }
}

/* --------- THUNKS -------- */
export const thunkLoadUser = () => async dispatch => {
  // get all users
  const res = await csrfFetch('/users/getAll');

  // if res is successful...
  if (res.ok) {
    // ...parse res data
    const users = await res.json();

    // dispatch load users
    dispatch(loadUsers(users));

    // return found users
    return users;
  }
}

export const thunkLoadUserById = userId => async dispatch => {
  // get user by user id
  const res = await csrfFetch(`/users/${userId}`)

  // if res is successful
  if (res.ok) {
    // parse res data
    const user = await res.json();

    // dispatch load user
    dispatch(loadUsers(user));

    // return found users
    return user;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsers = state => Object.values(state.users);
export const getUserById = userId => state => state.users[userId];

/* --------- REDUCERS -------- */
// initialize initial users
//? userReducer

const initialUsers = {};

const usersReducer = (state = initialUsers, action) => {
  // new users
  const newUsers = { ...state };

  switch (action.type) {
    //? reset case
    case RESET_USERS:
      return initialUsers;
    //? load case
    case LOAD_USERS:
      return Object.assign({}, newUsers, action.users);
    //? default case
    default:
      return newUsers;
  }
};

export default usersReducer;
