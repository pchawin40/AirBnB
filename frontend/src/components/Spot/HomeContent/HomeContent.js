// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import css
import './HomeContent.css';

// import store
import * as spotActions from '../../../store/spots';
import * as reviewActions from '../../../store/reviews';
import * as bookingActions from '../../../store/bookings';
import * as sessionActions from '../../../store/session';

// import offerList data
import { offerList } from '../../../data/data';

//? HomeContent component
const HomeContent = () => {

  /**
   * Controlled inputs
   */
  // invoke dispatch
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingError, setBookingError] = useState("");

  // get spotId
  const { spotId } = useParams();

  /**
   * UseSelector
   */
  // spot owner
  const spotOwner = useSelector(spotActions.getSpotOwner);
  // get current spot first 
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : {};
  const averageReviews = useSelector(reviewActions.getAverageReviews(spotId));
  const allReviewsByCurrentSpot = useSelector(reviewActions.getReviewsByCurrentSpot(spotId));
  const spotById = useSelector(spotActions.getSpotById(spotId));
  const allBookings = useSelector(bookingActions.getCurrentUserBookings);
  const sessionUser = useSelector(sessionActions.getSessionUser);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    console.log('allBookings', allBookings);
  }, [dispatch, spotId, allBookings, bookingError]);

  /**
   * Handler function
   */
  const updateCheckIn = e => {
    setCheckInDate(e.target.value);
  }

  const updateCheckOut = e => {
    setCheckOutDate(e.target.value);
  }

  // function to check if check in and check out are valid
  const checkBookingIsValid = () => {

    console.log('test',
      Object.values(allBookings).filter(booking => {
        return (
          booking.spotId === spotId
          &&
          booking.userId === sessionUser.id
          &&
          (new Date(booking.startDate).toDateString() === new Date(checkInDate).toDateString()
            ||
            new Date(booking.endDate).toDateString() === new Date(checkOutDate).toDateString())
        )
      }));

    return (
      checkInDate && checkOutDate
      &&
      // check if check out date is after check in date
      new Date(checkInDate) < new Date(checkOutDate)
      &&
      // check if checkInDate and checkOutDate already exists
      allBookings
      &&
      Object.values(allBookings).length > 0
      &&
      Object.values(allBookings).filter(booking => {
        return (
          booking.spotId === spotId
          &&
          booking.userId === sessionUser.id
          &&
          (new Date(booking.startDate).toDateString() === new Date(checkInDate).toDateString()
            ||
            new Date(booking.endDate).toDateString() === new Date(checkOutDate).toDateString())
        )
      }).length === 0
    );
  };

  const handleBookingReserve = () => {
    const postBooking = {
      startDate: checkInDate,
      endDate: checkOutDate
    }

    // reset data
    setBookingError("");
    setCheckInDate(null);
    setCheckOutDate(null);

    // call on thunk to post booking then fetch new booking data
    dispatch(bookingActions.thunkAddBooking(spotId, postBooking))
      .then(() => dispatch(bookingActions.thunkGetUserBookings()))
      .catch(async res => {
        const error = await res.json();
        const errorMsg = error.message;

        if ("Spot must NOT belong to the current user".includes(errorMsg)) {
          setBookingError("Spot must not belong to the current user");
        }
      });
  }

  return (
    spot &&
    <section className="home-content-outer-container">
      <section className="home-content-section-left">
        {/* //? Home Content Title Section */}
        <section className="home-content-title-section">
          {/* Title */}
          <p className="title-text">Home hosted by <span>{spotOwner.firstName} {spotOwner.lastName}</span></p>

          {/* Guests */}
          <p className="guests-text">2 guests • 1 bed • 0 baths</p>

          {/* include user image */}
          {
            spot &&
            <figure className="user-profile-pic-container">
              <img
                className="user-profile-pic"
                onError={e =>
                  e.target.src =
                  `https://robohash.org/${(spotId).toString(36).substring(7)}?set=set${Math.floor(spotId * 6)}`
                }
                src={
                  spotId * 3 > 1 ?
                    `https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(79 - spotId) > 0 ? Math.floor(79 - spotId) : 1}.jpg`
                    :
                    `https://xsgames.co/randomusers/assets/avatars/female/${Math.floor(79 - spotId) > 0 ? Math.floor(79 - spotId) : 1}.jpg`
                }
                alt="profile-pic" />
            </figure>
          }
        </section>

        {/* //? Home Content About Info */}
        <section className="home-content-about-info">
          {/* Spot Info */}
          <p>{spot.description}</p>
        </section>

        {/* //? Home Content Sleep Info */}
        <section className="home-content-sleep-info">
          {/* Spot Info */}
          <h3>Where you'll sleep</h3>

          <section>
            {/* card 1 */}
            <figure className="home-content-card-1">
              <i className="fa-solid fa-bed"></i>
              <span>
                Bedroom 1
              </span>
              <span>
                1 queen bed
              </span>
            </figure>

            {/* card 2 */}
            <figure className="home-content-card-2">
              <i className="fa-solid fa-bed"></i>
              <span>
                Bedroom 2
              </span>
              <span>
                1 queen bed
              </span>
            </figure>
          </section>
        </section>

        {/* //? Home Content Offer Info */}
        <section className="home-content-offer-info">
          {/* Offer Info */}
          <h3>What this place offers</h3>

          <section className="offer-list-container">
            {/* get list of offers */}
            {offerList.map(offer =>
              <figure key={offer.offer}>
                {offer.offerImage}
                <span>
                  {offer.offer}
                </span>
              </figure>
            )}
          </section>
        </section>
      </section>

      <section className="home-content-section-right">
        {/* Appointment Maker */}
        <section className='home-content-inner-right'>
          <aside className='home-content-inner-right-2'>

            {/* Title Section */}
            <section className="title">
              {/* //? Title */}
              {/* $ per night or per event */}
              <h2>
                <span>
                  {
                    `$${spotById?.price}`
                  }
                </span>
                &nbsp;

                {/* stay type */}
                <span>
                  {
                    spot.locationType === 'Stays'
                      ?
                      <>
                        night
                      </>
                      :
                      <>
                        experience
                      </>
                  }
                </span>
              </h2>

              <span>
                {/* Ratings */}
                <i className="fa-solid fa-star fa-xs" />

                <span>
                  {/* get average rating for current spot */}
                  {
                    averageReviews
                  }
                </span>

                <span>
                  •
                </span>

                {/* num of reviews */}
                <span id="review-info-num-reviews">{allReviewsByCurrentSpot.length} reviews</span>
              </span>
            </section>

            {/* Schedule Section */}
            <section className="schedule">
              {/* Check In */}
              <figure>
                <label
                  htmlFor='check-in'
                >
                  CHECK-IN
                </label>
                <input
                  type="date"
                  id="check-in"
                  onChange={updateCheckIn}
                />
              </figure>

              {/* Check Out */}
              <figure>
                <label
                  htmlFor='check-out'
                >
                  CHECK-OUT
                </label>
                <input
                  type="date"
                  id="check-out"
                  onChange={updateCheckOut}
                />
              </figure>

            </section>

            {/* Reserve Section */}
            <section className="reserve">
              <button
                className={checkBookingIsValid() ? "valid booking" : "invalid booking"}
                onClick={_ => checkBookingIsValid() ? handleBookingReserve() : ""}
              >
                Reserve
              </button>

              {/* Display error */}
              <span>
                {
                  bookingError
                }
              </span>
            </section>
          </aside>
        </section>
      </section>
    </section>
  );
}

// export component
export default HomeContent;
