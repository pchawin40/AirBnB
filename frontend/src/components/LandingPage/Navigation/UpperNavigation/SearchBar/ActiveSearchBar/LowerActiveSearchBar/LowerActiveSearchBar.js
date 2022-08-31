// import css
import './LowerActiveSearchBar.css';

//? LowerActiveSearchBar
const LowerActiveSearchBar = () => {
  return (
    <nav className="lower-search-nav">
      <div className="inner-lower-search-nav">
        {/* //? Where */}
        <button className="where-button">
          <div className="where-inner-div">
            <p>Where</p>
            <input className="where-input lower-text" placeholder='Search destinations' />
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
          <button className="who-button-text-button">
            <i class="fa-solid fa-magnifying-glass who-guest-search-icon"></i>
            <p>Search</p>
          </button>
        </button>
      </div>
    </nav >
  );
};

// export component
export default LowerActiveSearchBar;
