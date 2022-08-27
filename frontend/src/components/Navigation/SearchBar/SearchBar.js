// frontend/src/components/SearchBar/SearchBar.js

// import css
import './SearchBar.module.css';
import style from './SearchBar.module.css';

//? SearchBar component
const SearchBar = () => {
  // TODO: Render bar that contain link

  // TODO: handle on click to pop up modal

  return (
    <div className={`${style.searchBarContainer}`}>
      {/* //? Location */}
      <button className={`${style.searchBarButtons} ${style.locationButton}`}>
        <div>Anywhere</div>

        {/* span to divide */}
        <span className={`${style.lineDivide}`}/>
      </button>
      
      {/* //? Schedule */}
      <button className={`${style.searchBarButtons} ${style.scheduleButton}`}>
        <div>Any week</div>

        {/* span to divide */}
        <span className={`${style.lineDivide}`}/>
      </button>
      
      {/* //? Guests */}
      <button className={`${style.searchBarButtons} ${style.guestsButton}`}>
        {/* add guests text */}
        <div className={`${style.guestText}`}>Add guests</div>

        {/* search icon */}
        <div className={`${style.searchIcon}`}>
          <i className={`fa-solid fa-magnifying-glass ${style.magnifyingGlass}`}></i>
        </div>
      </button>
    </div>
  );
};

// export SearchBar
export default SearchBar;
