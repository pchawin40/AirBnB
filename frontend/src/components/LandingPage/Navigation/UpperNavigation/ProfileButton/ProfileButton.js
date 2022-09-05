// frontend/src/Navigation/ProfileButton/ProfileButton.js

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import session store 
import * as sessionActions from '../../../../../store/session';

// import css
import './ProfileButton.css';

//? ProfileButton Component
const ProfileButton = () => {

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
    const closeMenu = e => {
      if (!(e.target.classList.contains('profile-icon'))) {
        setShowMenu(false);
      }
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

  // const click = () => { console.log("showMenu click", showMenu) };
  // return ProfileButton component
  return (
    <div id="profile-button-container">
      <button id="nav-button-container" className="profile-icon" onClick={openMenu} >
        {/* represent menu icon */}
        <i className="fa-solid fa-bars fa-lg profile-icon" onClick={openMenu}></i>

        {/* represent user profile button */}
        <i id="user-profile-icon" className="fa-solid fa-circle-user fa-xl profile-icon" onClick={openMenu}></i>
      </button>
      {
        showMenu && (
          <ul id='profile-dropdown'>
            <div className="top-container">
              {/* //? Messages */}
              {/* <NavLink to="/">
                Messages
              </NavLink> */}

              {/* //? Trips */}
              {/* <NavLink to="/">
                Trips
              </NavLink> */}

              {/* //? Wishlist */}
              {/* <NavLink to="/">
                Wishlists
              </NavLink> */}
            </div>
            <div className="middle-container">
              {/* // TODO: Manage Listings */}
              <NavLink to="/" className="todo-link">
                Manage Listings
              </NavLink>

              {/* //? Host an Experience */}
              <NavLink className="active-link" to="/host/homes">
                Host an experience
              </NavLink>

              {/* //? Refer a Host */}
              {/* <NavLink to="/">
                Refer a Host
              </NavLink> */}

              {/* // TODO: Account: User Account */}
              <NavLink to="/" className="todo-link">
                Account
              </NavLink>
            </div>
            <div className="lower-container">
              {/* // TODO: Help: Lead to README in Github */} 
              <NavLink to="/" className="todo-link">
                Help
              </NavLink>

              {/* //? Log out */}
              <NavLink exact to="/" onClick={handleLogout} className="active-link">
                Logout
              </NavLink>
            </div>
          </ul>
        )
      }
    </div>
  );
};

// export profile button
export default ProfileButton;
