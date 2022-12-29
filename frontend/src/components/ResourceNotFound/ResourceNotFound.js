// import npm package
import ChromeDinoGame from 'react-chrome-dino';

// import react
import { useEffect } from 'react';

// import context
import { useLandingPage } from '../../context/LandingContext';

//? ResourceNotFound component
const ResourceNotFound = () => {
  /**
  * Controlled inputs
  */
  const { currentPage, setCurrentPage } = useLandingPage();

  /**
   * UseEffect
   */
  useEffect(() => {
    // set current page to host
    setCurrentPage("host");
  }, [currentPage]);

  return (
    <>
      <h1>
        Hey there! We do not have this resource. However, check out this cool dino game! Press space bar to start. . . .
      </h1>
      {/* ChromeDinoGame */}
      <ChromeDinoGame />
    </>
  );
};

// export component
export default ResourceNotFound;
