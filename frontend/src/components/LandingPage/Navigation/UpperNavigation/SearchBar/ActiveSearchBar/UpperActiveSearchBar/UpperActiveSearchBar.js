// import react
import { useEffect, useState } from "react";

// improt react-redux
import { useSelector } from "react-redux";

// import context
import { useSpot } from "../../../../../../../context/SpotContext";

// import component
import LogoContainer from "../../../LogoContainer";
import UpperRightNavLink from "../../../UpperRightNavLink";

// import css
import './UpperActiveSearchBar.css';

// import store
import * as spotActions from '../../../../../../../store/spots';

//? UpperActiveSearchBar component
const UpperActiveSearchBar = ({ userHostLinks, isLoaded, user, sessionLinks }) => {
  /**
   * Controlled inputs
   */
  const [spotLocationType, setSpotLocationType] = useState("All");
  const { spots, setSpots } = useSpot();
  const { showActiveBarModal, setShowActiveBarModal } = useSpot();

  /**
   * Selector functions
   */
  const SpotByLocationType = useSelector(spotActions.getSpotByLocationType(spotLocationType));
  // get spot
  const spotState = useSelector(spotActions.getAllSpots);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (spotLocationType !== "All") {
      setSpots(SpotByLocationType);
    } else {
      setSpots(spotState);
    }
  }, [spotLocationType]);

  /**
   * Handler functions
   */
  const handleLocationTypeUpdate = (filterType) => {
    setSpotLocationType(filterType)
  };

  return (
    <div id="navigation-bar" className="active-nav-bar" style={{ zIndex: 10 }}>
      {/* UpperActiveSearchBar */}
      <LogoContainer />

      <section className="active-nav-bar-section">
        {/* all */}
        <li
          className="active-nav-bar-li nav-li-1"
          onClick={_ => handleLocationTypeUpdate("All")}
        >
          All
        </li>

        {/* stays */}
        <li
          className="active-nav-bar-li nav-li-2"
          onClick={_ => handleLocationTypeUpdate("Stays")}
        >
          Stays
        </li>

        {/* experiences */}
        <li
          className="active-nav-bar-li nav-li-3"
          onClick={_ => handleLocationTypeUpdate("Experiences")}
        >
          Experiences
        </li>
      </section>

      {/* //? UpperRightNavLink */}
      <UpperRightNavLink userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />
    </div>
  );
};

export default UpperActiveSearchBar;
