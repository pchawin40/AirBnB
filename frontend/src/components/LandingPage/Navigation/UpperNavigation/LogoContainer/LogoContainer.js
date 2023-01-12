// import react-router-dom
import { NavLink } from "react-router-dom";

// import css
import './LogoContainer.css';

//? LogoContainer component
const LogoContainer = () => {
  return (
    <div className="logo-container" style={{ zIndex: 100 }}>
      <NavLink exact to="/">
        {/* //? Logo */}
        <i className="fa-brands fa-airbnb fa-2xl"></i>

        {/* //? ExperStays */}
        <span className="experstays-text">ExperStays</span>
      </NavLink>
    </div>
  );
}

// export LogoContainer
export default LogoContainer;
