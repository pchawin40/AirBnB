// import csrfFetch
import { csrfFetch } from "./csrf";

/* --------- ACTIONS -------- */
//? Load User
// action
const LOAD_USERS = "users/LOAD_USERS";

// action creator: load all users
const loadUsers = users => {
  return {
    type: LOAD_USERS,
    users
  };
};

/* --------- THUNKS -------- */
export const thunkLoadUsers = () => async dispatch => {
  // get all users
  const res = await fetch('/users');
  
  // if res is successful...
  if (res.ok) {
    // ...parse res data
    const users = res.json();
    
    // dispatch load users
    dispatch(loadUsers(users));

    // return found users
    return users;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getAllUsers = state => state.users;

/* --------- REDUCERS -------- */
// initialize initial users
const initialUsers = thunkLoadUsers();

//? userReducer
const usersReducer = (state = initialUsers, action) => {
  // new users
  const newUsers = { ...state };
  
  switch (action.type) {
    //? default case
    default:
      return newUsers;
  }
};

export default usersReducer;
