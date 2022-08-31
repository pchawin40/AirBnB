//? UpperRightNavLink component
const UpperRightNavLink = ({ userHostLinks, isLoaded, user, sessionLinks }) => {
  console.log("isLoaded", isLoaded);
  console.log("userHostLinks", userHostLinks);
  console.log("user", user);
  console.log("sessionLinks", sessionLinks);

  return (
    <ul>
      <li id="nav-link-container">
        {/* //TODO: To make path */}
        {/* display hosting text links */}
        {userHostLinks}

        {/* // TODO: Modal for Region Setting */}
        <i className="fa-solid fa-globe" id="nav-link-fa-globe"></i>

        {/* //TODO: sessionLinks */}
        {isLoaded && user && sessionLinks}
      </li>
    </ul>
  );
};

// export component
export default UpperRightNavLink;
