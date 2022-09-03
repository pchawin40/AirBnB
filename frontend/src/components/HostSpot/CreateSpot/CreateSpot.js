// import react
import { useState } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import react-router-dom
import { useHistory, NavLink } from 'react-router-dom';

// import store
import * as spotActions from '../../../store/spots';

// import css
import './CreateSpot.css';

// import component
import SpotForm from './SpotForm';

//? CreateSpot component
const CreateSpot = () => {

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
  // invoke history
  const history = useHistory();

  //? handleExitButton: navigate back to home
  const handleExitButton = () => {
    return history.push('/');
  }

  return (
    <>
      <main id="create-page">
        {/* //? Left aside */}
        <aside id="create-left-aside">
          <figure id="create-logo-container">
            <i style={{ zIndex: 1 }} onClick={handleExitButton} className="fa-brands fa-airbnb fa-2xl create-logo-icon"></i>
          </figure>
          {/* airbnb logo */}
          <h1>Describe your spot to host ☺</h1>
        </aside>

        {/* //? Right section */}
        <section id="create-right-section">
          {/* create step */}
          <section className="create-right-form-content">
            {/* //? Spot Form component */}
            <SpotForm/>
          </section>
          <button className="create-button spot-exit" id="right-section-exit-button" onClick={handleExitButton}>
            Exit
          </button>
          <section id="create-right-lower-section">
            <li>
              <NavLink to="/host/homes" className="create-button-spot-back">
                Back
              </NavLink>
            </li>
          </section>
        </section>
      </main>
    </>
  );
};

// export component
export default CreateSpot;
