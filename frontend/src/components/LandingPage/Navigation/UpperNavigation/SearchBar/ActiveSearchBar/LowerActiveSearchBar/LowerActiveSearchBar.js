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
  const { showActiveBarModal, setShowActiveBarModal } = useSpot();

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
  }, [spotQuery, spots]);

  /**
   * Handler functions
   */
  const handleQueryUpdate = (e) => {
    setSpotQuery(e.target.value);
  }

  const handleSearch = () => {
    // set spots with given query if exists
    if (spotQuery) {
      setSpots(spotByLocation)
    } else {
      setSpots(spotState);
    }


    // reset query
    setSpotQuery("");

    // turn search bar back to inactive
    setShowActiveBarModal(false);
  }

  return (
    <nav className="lower-search-nav">
      <div className="inner-lower-search-nav">
        {/* //? Where */}
        <button
          className="where-button"
          onClick={() => {
            document.querySelector(".where-input.lower-text").select()
          }}
        >
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
        {/* <button
          className="check-in-button"
          onClick={() => {
            document.querySelector(".lower-text.check-in").select()
          }}
        >
          <div id="check-in-inner-div">
            <p>Check in</p>
            <input
              className='lower-text check-in'
              placeholder='Add dates'
              type='date'
            />
          </div>
        </button> */}

        {/* //? Check out */}
        {/* <button
          className="check-out-button"
          onClick={() => {
            document.querySelector(".lower-text.check-out").select()
          }}
        >
          <div id="check-out-inner-div">
            <p>Check out</p>
            <input
              className='lower-text check-out'
              placeholder='Add dates'
              type='date'
            />
          </div>
        </button> */}

        {/* //? Who */}
        <button
          className="who-button"
          onClick={_ => {
            handleSearch();
            setShowActiveBarModal(false);
          }}
        >
          <div
            className="who-button-text-button"
          >
            <i className="fa-solid fa-magnifying-glass who-guest-search-icon"></i>
            <p>
              Search
            </p>
          </div>
        </button>
      </div>
    </nav >
  );
};

// export component
export default LowerActiveSearchBar;
