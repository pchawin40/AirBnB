// frontend/src/components/BookingModal/BookingModal.js

// import css
import './BookingModal.css';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spots';

// import react
import { useEffect } from 'react';

//? BookingModal component
const BookingModal = () => {
  /**
   * Controlled inputs
   */


  /**
   * Selector functions
   */
  const currentUserBookings = useSelector(bookingActions.getCurrentUserBookings);
  const allSpots = useSelector(spotActions.getAllSpots);

  // invoke dispatch
  const dispatch = useDispatch();

  /**
   *  UseEffect
   */
  useEffect(() => {
  }, [dispatch, currentUserBookings]);


  /**
   * Handler functions
   */
  const handleBookingDelete = bookingId => {
    // call on thunk to delete booking
    dispatch(bookingActions.thunkRemoveBooking(bookingId))
      .then(() => dispatch(bookingActions.thunkGetUserBookings()));
  }

  // load list of bookings
  const loadBookings = () => {
    return currentUserBookings.map(booking => {
      {/* Delete booking */ }
      // convert start date to readable start date
      const readableStartDate = new Date(booking.startDate).toISOString().split('T')[0];

      // convert end date to readable end date
      const readableEndDate = new Date(booking.endDate).toISOString().split('T')[0];

      const currentSpotName = Object.values(allSpots).find(spot => spot.id === booking.spotId).name;

      return (
        <>
          <tr colSpan="1">
            <figure>
              {/* Get Spot's Name */}
              <span>
                {
                  currentSpotName
                }
              </span>

              {/* Get Start Date */}
              <span>
                {
                  readableStartDate
                }
              </span>

              {/* Get End Date */}
              <span>
                {
                  readableEndDate
                }
              </span>

              {/* Show Button if start date is after today's date*/}
              {
                readableStartDate > new Date().toISOString().split('T')[0]
                &&
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleBookingDelete(booking.id)
                  }}
                >
                  <i className="fa-solid fa-trash fa-xl" />
                </button>
              }
            </figure>
          </tr>
        </>
      );
    });
  }

  return (
    <section className="booking modal">
      <table className="booking modal inner">
        {/* Header for booking */}
        <thead>
          <th colSpan="3">
            My Bookings
          </th>
        </thead>

        {/* list of bookings */}
        <tbody>
          <tr>
            <figure>
              <span>
                My Destination
              </span>
              <span>
                Start Date
              </span>
              <span>
                End Date
              </span>
              <span>
                Modify
              </span>
            </figure>
          </tr>
          {
            currentUserBookings.length > 0 &&
            loadBookings()
          }
        </tbody>
      </table>
    </section>
  );
};

export default BookingModal;
