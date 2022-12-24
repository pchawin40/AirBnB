// import react-redux
import { useEffect, useState } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams, useHistory } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';
import * as reviewActions from '../../../../store/reviews';
import * as sessionActions from '../../../../store/session';

// import context
import { Modal } from '../../../../context/Modal';
import { useReview } from '../../../../context/ReviewContext';

// import component
import EditSpotModal from './EditSpotModal';

// import css
import './Headline.css';
import { useSpot } from '../../../../context/SpotContext';

//? Headline component
const Headline = () => {
  /**
   * Controlled inputs
   */
  // state for review modal
  const { editSpotModal, setEditSpotModal } = useSpot();
  const { avgReview, setAvgReview } = useReview();

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  // get current session user
  const currentUser = useSelector(sessionActions.getSessionUser);

  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : null;

  useEffect(() => {
    if (spotId) {
      dispatch(reviewActions.getReviewsBySpotId(Number(spotId)));
    }
  }, [dispatch, spotId, spots]);

  //? handle edit spot
  const handleEditSpot = () => setEditSpotModal(true);

  //? handle delete spot
  const handleDeleteSpot = spotId => {

    // user confirmation prompt
    const choice = window.confirm("Are you sure you want to delete this spot?");
    if (!choice) return;

    // delete spot
    dispatch(spotActions.thunkDeleteSpot(spotId))
      .then(() => spotActions.thunkGetSpots())
      .catch(async res => {
      const data = await res.json();

      console.error("data", data.message);
    });

    // redirect user to home page after delete
    return history.push('/');
  };

  //? handle add image
  const userEdit = () => {
    // if user own the spot 
    if ((spot && currentUser) && (Number(spot.ownerId) === currentUser.id)) {
      // return buttons
      return (
        <>
          {/* // button for spot */}
          <nav className="owner-button-spot-container">
            <button className="owner-edit-spot-button" onClick={handleEditSpot}>
              Edit Spot
            </button>
            <button className="owner-delete-spot-button" onClick={e => handleDeleteSpot(spot.id)}>
              Delete Spot
            </button>
          </nav>
        </>
      );
    }

  }

  // get spot by spot id
  return (
    // if spot is available, return spot
    <section className="headline-container">
      {/* //? Headline Div 1 */}
      <div className="headline_div_1">
        <h1>{spot ? spot.name : ""}</h1>
        {/* if spot is user's property, show buttons */}
        {userEdit()}
        {
          // Show Edit Modal
          editSpotModal
          &&
          <Modal
              onClose={_ => {
                // turn window vertical scroll back on
                document.body.style.overflowY = "scroll";

                setEditSpotModal(false);
              }}
            >
            <EditSpotModal editSpotModal={editSpotModal} setEditSpotModal={setEditSpotModal} />
          </Modal>
        }
      </div>

      {/* //? Div 2 Inner Div 1 */}
      <div className="div_2_inner_div_1">
        {/* review by spot id */}
        {/* //TODO: To fix */}
        <span><i className="fa-solid fa-star"></i>
          {
            avgReview
          }
        </span>

        <span>•</span>

        {/* # of reviews */}
        {/* <span className="review-length-text">{allReviewsByCurrentSpot.length ? allReviewsByCurrentSpot.length : 0} reviews</span> */}

        {/* host type */}
        {/* // TODO: To fix avgReview */}
        <span><i className="fa-solid fa-medal"></i> {avgReview && avgReview >= 4 ? "Superhost" : "Host"} </span>

        <span>•</span>

        {/* location */}
        <span className="location-text">{spot ? `${spot.city}, ${spot.state}, ${spot.country}` : ""}</span>
      </div>

      {/* //? Div 2 Inner Div 2 */}
      <div className="div_2_inner_div_2">
        {/* share */}
        <span><i className="fa-solid fa-arrow-up-from-bracket"></i>Share</span>
        {/* save */}
        <span><i className="fa-regular fa-heart"></i>Save</span>
      </div>
    </section>
  );
};

// export component
export default Headline;
