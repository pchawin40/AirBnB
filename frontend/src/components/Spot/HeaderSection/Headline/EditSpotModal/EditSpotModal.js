// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory, useParams } from 'react-router-dom';
import { useSpot } from '../../../../../context/SpotContext';

// import store
import * as spotActions from '../../../../../store/spots';

// import css
import '../../../../HostSpot/CreateSpot';
import SpotForm from '../../../../HostSpot/CreateSpot/SpotForm';
import './EditSpotModal.css';

//? CreateSpot component
const EditSpotModal = () => {
  // deconstruct spotId
  const { spotId } = useParams();

  /**
   * Controlled Inputs:
   * ------------------
   * address: spot's address
   * city: spot's city
   * state: spot's state
   * country: spot's country
   * lat: spot's lat
   * lng: spot's lng
   * name: spot's name
   * description: spot's description
   * price: spot's price
   * previewImage: spot's preview image
   * validationErrors: spot's validation errors
   */
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const { editSpotModal, setEditSpotModal } = useSpot();

  // turn off window scroll y
  document.body.style.overflowY = "hidden";

  // invoke useDispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  const currentSpot = useSelector(spotActions.getSpotById(spotId));

  /**
   * UseEffect
   */
  useEffect(() => {
    // nothing for now
  }, [dispatch, spotId]);

  useEffect(() => {
    setAddress(currentSpot.address);
    setCity(currentSpot.city);
    setState(currentSpot.state);
    setCountry(currentSpot.country);
    setLat(currentSpot.lat);
    setLng(currentSpot.lng);
    setName(currentSpot.name);
    setDescription(currentSpot.description);
    setPrice(currentSpot.price);
    setPreviewImage(currentSpot.previewImage);
  }, [currentSpot]);

  return (
    <>
      <main id="create-page">
        {/* //? Left aside */}
        <aside id="create-left-aside">
          <figure id="create-logo-container">
            <i 
            style={{ zIndex: 1 }}
            onClick={_ => {
              // turn window vertical scroll back on
              document.body.style.overflowY = "scroll";

              return history.push('/')
            }} 
            className="fa-brands fa-airbnb" id="create-logo-icon"></i>
          </figure>
          {/* airbnb logo */}
          <h1>Edit your current listing spot ☺</h1>
        </aside>

        {/* //? Right section */}
        <section id="create-right-section">
          {/* create step */}
          <section className="create-right-form-content">
            {/* Edit Spot Modal */}
            <SpotForm spotActivity="edit" currentSpot={currentSpot} />
          </section>
          <button 
          className="create-button spot-exit" 
          id="right-section-exit-button" 
          onClick={_ => {
            // turn window vertical scroll back on
            document.body.style.overflowY = "scroll";

            return setEditSpotModal(false);
          }}
          >
            Exit
          </button>
          <section id="create-right-lower-section">
            <li>
              <span
                onClick={_ => {
                  // turn window vertical scroll back on
                  document.body.style.overflowY = "scroll";
                  return setEditSpotModal(false);
                }}
                className="create-button-spot-back">
                Back
              </span>
            </li>
          </section>
        </section>
      </main>
    </>
  );
};

// export component
export default EditSpotModal;
