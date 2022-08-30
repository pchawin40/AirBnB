// frontend/src/Component/Spot/HomeContent/HomeContent.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import css
import './HomeContent.css';

// import store
import * as spotActions from '../../../store/spots'

// import offerList data
import { offerList } from '../../../data/data';

//? HomeContent component
const HomeContent = () => {

  // invoke dispatch
  const dispatch = useDispatch();

  // get spotId
  const { spotId } = useParams();

  // get current spot first 
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : {};

  // spot owner
  const spotOwner = useSelector(spotActions.getSpotOwner());

  // useEffect for dispatch (initial render)
  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));

    return () => {
      dispatch(spotActions.resetSpot());
    };
  }, [dispatch, spotId]);

  return (
    spot && 
    <>
      <section className="home-content-section-container">
        {/* //? Home Content Title Section */}
        <section className="home-content-title-section">
          {/* Title */}
          <p className="title-text">Home hosted by <span>{spotOwner.firstName} {spotOwner.lastName}</span></p>

          {/* Guests */}
          <p className="guests-text">2 guests • 1 bed • 0 baths</p>

          {/* include user image */}
          <figure className="user-profile-pic-container">
            <img className="user-profile-pic" src="https://xsgames.co/randomusers/avatar.php?g=female" alt="profile-pic" />
          </figure>
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

        {/* //! TODO: Calendar API: for spot stay reserve */}

        {/* //? Location Map */}
        {/* <section className="home-content-location-info"> */}
        {/* location header */}

        {/* map */}

        {/* location */}

        {/* about location */}
        {/* </section> */}

        {/* //? Host Info */}
        {/* <section className="home-content-host-info"> */}
        {/* host header */}

        {/* about host */}

        {/* host contact info */}
        {/* </section> */}

        {/* //? Things to know */}
        {/* <section className="home-content-know-info"> */}
        {/* house rules */}

        {/* health & safety */}

        {/* cancellation policy */}
        {/* </section> */}

      </section>
    </>
  );
}

// export component
export default HomeContent;
