// frontend/src/store/bookings.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load bookings
// action
const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';

// action creator: load booking data
export const loadBookings = bookings => {
  return {
    type: LOAD_BOOKINGS,
    bookings
  };
};

//? Action: Add a booking
// action
const ADD_BOOKING = 'bookings/ADD_BOOKING';

// action creator: add a booking
export const addBooking = booking => {
  return {
    type: ADD_BOOKING,
    booking
  };
};

//? Action: Remove a booking
// action
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING';

// action creator: remove a booking
export const removeBooking = bookingId => {
  return {
    type: REMOVE_BOOKING,
    bookingId
  }
}

/* --------- THUNKS -------- */
//? Thunk to get user bookings
export const thunkGetUserBookings = () => async dispatch => {
  // fetch all bookings given by current spot
  const res = await csrfFetch(`/users/bookings`);

  if (res.ok) {
    const bookings = await res.json();

    dispatch(loadBookings(bookings.Bookings))

    return bookings;
  }

  // else, return null
  return null;
}

//? Thunk action to add booking
export const thunkAddBooking = (spotId, booking) => async dispatch => {
  // fetch route to create and return new booking from spot 
  const res = await csrfFetch(`/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify({
      startDate: booking.startDate,
      endDate: booking.endDate
    })
  });

  if (res.ok) {
    // parsed res to json
    const postBooking = await res.json();

    dispatch(addBooking(postBooking));

    // return booking
    return postBooking;
  }
}

//? Thunk action to remove booking
export const thunkRemoveBooking = bookingId => async dispatch => {
  console.log('bookingId', bookingId);

  // call csrfFetch to remove booking with given bookingId
  const res = await csrfFetch(`/bookings/${bookingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const destroyBooking = await res.json();

    dispatch(removeBooking(bookingId));

    return destroyBooking;
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserBookings = state => Object.values(state.bookings);

/* --------- REDUCERS -------- */
const initialBookings = {};

export const bookingsReducer = (state = initialBookings, action) => {
  // new booking
  const newBookings = { ...state };

  switch (action.type) {
    //? case REMOVE_BOOKING
    case REMOVE_BOOKING:
      // find id
      Object.values(newBookings).forEach((booking, index) => {
        if (booking.id === action.bookingId) {
          delete newBookings[index];
        }
      });
      // delete newBookings[action.bookingId];
      return newBookings;

    //? default case
    default:
      return Object.assign({}, newBookings, action.bookings);
  }
}

// export reducer
export default bookingsReducer;
