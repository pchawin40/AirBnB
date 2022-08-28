import UpperNavigation from "./UpperNavigation";

//? Navigation component
const Navigation = ({ isLoaded }) => {
  return (
    <>
      <UpperNavigation isLoaded={isLoaded} />
      {/* <LowerNavigation/> */}
    </>
  );
}

// export Navigation
export default Navigation;
