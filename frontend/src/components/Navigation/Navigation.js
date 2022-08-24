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
import ProfileButton from './ProfileButton';

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
        <NavLink to='/login'>Log In</NavLink>
        {/* //? Signup link */}
        <NavLink to='/signup'>Sign Up</NavLink>
      </>;
    

  //? Render Navigation Links and Logout button
  return (
    <ul>
      <li>
        <NavLink exact to='/'>
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
};

// export Navigation
export default Navigation;
