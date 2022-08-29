// import component
import UpperNavigation from "./UpperNavigation";
import LowerNavigation from "./LowerNavigation";

// import css
import './Navigation.css';

//? Navigation component
const Navigation = ({ isLoaded }) => {
  return (
    <>
      <UpperNavigation isLoaded={isLoaded} />
      <LowerNavigation />
    </>
  );
}

// export Navigation
export default Navigation;
