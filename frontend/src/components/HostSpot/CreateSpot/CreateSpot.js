// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import react-router-dom
import { useHistory, NavLink } from 'react-router-dom';
import { useLandingPage } from '../../../context/LandingContext';

// import css
import './CreateSpot.css';

// import component
import SpotForm from './SpotForm';

//? CreateSpot component
const CreateSpot = () => {

  /**
   * Controlled inputs
   */
  const { currentPage, setCurrentPage } = useLandingPage();

  /**
   * UseEffect
   */
  useEffect(() => {
    // set page to create spot
    setCurrentPage('create');
  }, [currentPage]);

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
          {/* experstays logo */}
          <h1>Describe your spot to host ☺</h1>
        </aside>

        {/* //? Right section */}
        <section id="create-right-section">
          {/* create step */}
          <section className="create-right-form-content">
            {/* //? Spot Form component */}
            <SpotForm />
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
