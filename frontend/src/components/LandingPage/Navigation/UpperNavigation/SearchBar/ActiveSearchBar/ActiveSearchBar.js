// frontend/src/components/SearchBar/ActiveSearchBar/ActiveSearchBar.js

// import css
import './ActiveSearchBar.css';

// import component
import LowerActiveSearchBar from "./LowerActiveSearchBar";
import UpperActiveSearchBar from "./UpperActiveSearchBar";

//? ActiveSearchBar component
const ActiveSearchBar = ({ userHostLinks, isLoaded, user, sessionLinks }) => {

  return (
    <aside className="active-bar-container">
      {/* keep logo and side links */}
      {/* upper active search bar */}
      <UpperActiveSearchBar userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />
      
      {/* lower active search bar */}
      <LowerActiveSearchBar />
    </aside>
  );
};

// export ActiveSearchBar component
export default ActiveSearchBar;
