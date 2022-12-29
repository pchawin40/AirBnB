// import component
import LogoContainer from "../../../LogoContainer";
import UpperRightNavLink from "../../../UpperRightNavLink";

// import css
import './UpperActiveSearchBar.css';

// import component
const UpperActiveSearchBar = ({ userHostLinks, isLoaded, user, sessionLinks }) => {
  return (
    <div id="navigation-bar" className="active-nav-bar" style={{ zIndex: 10 }}>
      {/* UpperActiveSearchBar */}
      <LogoContainer />

      <section className="active-nav-bar-section">
        {/* stays */}
        <li className="active-nav-bar-li nav-li-1">
          All
        </li>

        {/* experiences */}
        <li className="active-nav-bar-li nav-li-2">
          Stays
        </li>

        {/* online experiences */}
        <li className="active-nav-bar-li nav-li-3">
          Experiences
        </li>
      </section>

      {/* //? UpperRightNavLink */}
      <UpperRightNavLink userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />
    </div>
  );
};

export default UpperActiveSearchBar;
