// import npm package
import ChromeDinoGame from 'react-chrome-dino';

//? ResourceNotFound component
const ResourceNotFound = () => {
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
