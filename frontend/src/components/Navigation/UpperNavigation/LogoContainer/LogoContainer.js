// import react-router-dom
import { NavLink } from "react-router-dom";

//? LogoContainer component
const LogoContainer = () => {
  return (
    <div className="logo-container">
      <NavLink exact to ="/">
        {/* //? Logo */}
        <i className="fa-brands fa-airbnb fa-2xl"></i>

        {/* //? Airbnb */}
        <span className="airbnb-text">airbnb</span>
      </NavLink>
    </div>
  );
}

// export LogoContainer
export default LogoContainer;
