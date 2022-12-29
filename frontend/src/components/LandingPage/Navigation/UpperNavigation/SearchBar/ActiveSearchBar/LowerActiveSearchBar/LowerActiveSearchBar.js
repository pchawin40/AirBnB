// import react-redux
import { useSelector } from 'react-redux';

// import css
import './LowerActiveSearchBar.css';

// import store
import * as spotActions from '../../../../../../../store/spots';

// import react
import { useEffect } from 'react';

// import context
import { useSpot } from '../../../../../../../context/SpotContext';

//? LowerActiveSearchBar
const LowerActiveSearchBar = () => {
  /**
   * Controlled inputs
   */
  const { spotQuery, setSpotQuery } = useSpot();
  const { spots, setSpots } = useSpot();

  /**
   * Selector functions
   */
  const spotByLocation = useSelector(spotActions.getSpotByLocation(spotQuery));
  // get spot
  const spotState = useSelector(spotActions.getAllSpots);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (spotQuery) {
      setSpots(spotByLocation)
    } else {
      setSpots(spotState);
    }
  }, [spotQuery]);

  /**
   * Handler functions
   */
  const handleQueryUpdate = (e) => {
    setSpotQuery(e.target.value);
  }

  return (
    <nav className="lower-search-nav">
      <div className="inner-lower-search-nav">
        {/* //? Where */}
        <button className="where-button">
          <div className="where-inner-div">
            <p>Where</p>
            <input
              onChange={handleQueryUpdate}
              className="where-input lower-text"
              placeholder='Search destinations'
            />
          </div>
        </button>

        {/* //? Check in */}
        <button className="check-in-button">
          <div id="check-in-inner-div">
            <p>Check in</p>
            <p className="lower-text">Add dates</p>
          </div>
        </button>

        {/* //? Check out */}
        <button className="check-out-button">
          <div id="check-out-inner-div">
            <p>Check out</p>
            <p className="lower-text">Add dates</p>
          </div>
        </button>

        {/* //? Who */}
        <button className="who-button">
          <section className="who-button-text-content">
            <p>Who</p>
            <p className="lower-text">Add guests</p>
          </section>
          <div className="who-button-text-button">
            <i className="fa-solid fa-magnifying-glass who-guest-search-icon"></i>
            <p>Search</p>
          </div>
        </button>
      </div>
    </nav >
  );
};

// export component
export default LowerActiveSearchBar;
