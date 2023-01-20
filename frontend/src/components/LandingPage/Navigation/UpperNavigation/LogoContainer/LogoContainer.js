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
        <figure
          className="experstays-logo"
        >
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1674187163/ExperStays/ExperStays_i0stos.png"
            alt="experstays-logo"
          />
        </figure>

        {/* //? ExperStays */}
        <span className="experstays-text">ExperStays</span>
      </NavLink>
    </div>
  );
}

// export LogoContainer
export default LogoContainer;
