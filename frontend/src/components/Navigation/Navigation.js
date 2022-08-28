// frontend/src/Navigation/Navigation.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react-redux
import { useSelector } from 'react-redux';

// import css
import './Navigation.css';

// import session store
import * as sessionActions from '../../store/session';

// import component
import ProfileButton from './ProfileButton/ProfileButton';
import LoginFormModal from '../UserLoginRegistration/LoginFormModal';
import LogoContainer from './LogoContainer';
import SearchBar from './SearchBar';
import HomeFooterBar from '../HomeFooterBar/HomeFooterBar';

//? Navigation Component
const Navigation = ({ isLoaded }) => {
  // get current session user
  // const sessionUser = undefined;
  const sessionUser = useSelector(sessionActions.getSessionUser);

  const sessionLinks =
    // When have session user, contain link to log out current user
    sessionUser ?
      // render ProfileButton component 
      <ProfileButton user={sessionUser} />
      :
      // When no session user, contain links to login and sign up
      <>
        {/* //? Login link */}
        <LoginFormModal to='/login'>Log In</LoginFormModal>
        {/* //? Signup link */}
        <NavLink to='/signup'>Sign Up</NavLink>
      </>;
    
  const userHostLinks =
    sessionUser ?
      // Switch to hosting (if logged in)
      <NavLink className="user-host-links" to="/host/homes">Switch to hosting</NavLink>
      :
      // Become a host (if not logged in)
      <NavLink className="user-host-links" to="/hosting">Become a Host</NavLink>;

  //? Render Navigation Links and Logout button
  return (
    <div id="navigation-bar">
      {/* //? Render Logo Container */}
      <LogoContainer/>

      {/* //? Render Search Link */}
      <SearchBar/>
      
      {/* // TODO: Render User Link */}
      {/* //? NavLink */}
      <ul>
        <li id="nav-link-container">
          {/* //TODO: To make path */}
          {/* display hosting text links */}
          {userHostLinks}
          
          {/* // TODO: Modal for Region Setting */}
          <i className="fa-solid fa-globe"></i>
          
          {/* //TODO: sessionLinks */}
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
};

// export Navigation
export default Navigation;
