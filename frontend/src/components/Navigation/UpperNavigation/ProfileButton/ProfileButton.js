// frontend/src/Navigation/ProfileButton/ProfileButton.js

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import session store 
import * as sessionActions from '../../../../store/session';

// import css
import './ProfileButton.css';

//? ProfileButton Component
const ProfileButton = ({ user }) => {

  // invoke dispatch
  const dispatch = useDispatch();

  /**
   * Controlled Inputs:
   * ------------------
   * showMenu: show menu for current user
   */
  const [showMenu, setShowMenu] = useState(false);

  //? openMenu: toggle menu
  const openMenu = () => {
    // if showMenu is true, keep showMenu state as is
    if (showMenu) return;
    // otherwise, set to true
    setShowMenu(true);
  }

  //? useEffect for setting show menu
  useEffect(() => {
    // if show menu is currently set as false, don't do anything
    if (!showMenu) return;

    // helper function to turn menu off
    const closeMenu = () => {
      setShowMenu(false);
    }

    // when user click outside menu, close it
    document.addEventListener('click', closeMenu);

    // cleanup: remove close menu after clicking to exit menu
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  //? handleLogout: handle logout action
  const handleLogout = _ => {
    // dispatch logout action
    dispatch(sessionActions.logout());
  }

  // return ProfileButton component
  return (
    <div id="profile-button-container">
      <button id="nav-button-container" onClick={openMenu}>
        {/* represent menu icon */}
        <i className="fa-solid fa-bars fa-lg"></i>

        {/* represent user profile button */}
        <i id="user-profile-icon" className="fa-solid fa-circle-user fa-xl"></i>
      </button>
      {
        showMenu && (
          <ul id='profile-dropdown'>
            <button onClick={handleLogout}>
              Logout
            </button>

            {/* <li>Hello {user.firstName} {user.lastName}!</li>
            <li>{user.email}</li>
            <li> */}
            {/* </li> */}
          </ul>
        )
      }
    </div>
  );
};

// export profile button
export default ProfileButton;
