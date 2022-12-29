// frontend/src/components/SearchBar/SearchBar.js

// import css
import './SearchBar.css';

// import react
import { useState } from 'react';

// import context
import { Modal } from '../../../../../context/Modal';

// import component
import ActiveSearchBar from './ActiveSearchBar';
import { useSpot } from '../../../../../context/SpotContext';

//? SearchBar component
const SearchBar = ({ userHostLinks, isLoaded, user, sessionLinks }) => {
  // state for review modal
  const { showActiveBarModal, setShowActiveBarModal } = useSpot();

  // TODO: Render bar that contain link

  // TODO: handle on click to pop up modal

  return (
    <div className='searchBarContainer'>
      {/* //? Location */}
      <button className='searchBarButtons locationButton' onClick={_ => setShowActiveBarModal(true)}>
        <div>Anywhere</div>

        {/* span to divide */}
        {/* <span className='lineDivide' /> */}
      </button>

      {/* //? Schedule */}
      {/* <button className='searchBarButtons scheduleButton' onClick={_ => setShowActiveBarModal(true)}> */}
      {/* <div>Any week</div> */}

      {/* span to divide */}
      {/* <span className='lineDivide'/> */}
      {/* </button> */}

      {/* //? Guests */}
      <button className='searchBarButtons guestsButton' onClick={_ => setShowActiveBarModal(true)}>
        {/* add guests text */}
        {/* <div className='guestText'>Add guests</div> */}

        {/* search icon */}
        <div className='searchIcon'>
          <i className='fa-solid fa-magnifying-glass magnifyingGlass'></i>
        </div>
      </button>

      {
        showActiveBarModal
        &&
        <Modal onClose={_ => setShowActiveBarModal(false)}>
          <ActiveSearchBar userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />
        </Modal>
      }
    </div>
  );
};

// export SearchBar
export default SearchBar;
