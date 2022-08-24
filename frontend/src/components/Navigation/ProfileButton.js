// frontend/src/Navigation/ProfileButton.js

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useDispatch } from 'react-redux';

// import session store 
import * as sessionActions from '../../store/session';

//? ProfileButton Component
const ProfileButton = ({user}) => {
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
    if (showMenu) return;
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

    // remove close menu after clicking to exit menu
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  //? handleLogout: handle logout action
  const handleLogout = _ => {
    // dispatch logout action
    dispatch(sessionActions.logout());
  }

  return (
    <div>
      <button onClick={openMenu}>
        {/* represent user profile button */}
        <i class="fa-solid fa-user"></i>
      </button>
      {
        showMenu && (
          <ul className='profile-dropdown'>
            <li>Hello {user.firstName} {user.lastName}!</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )
      }
  </div> 
  );
};

// export profile button
export default ProfileButton;
