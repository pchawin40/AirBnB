// frontend/src/components/SpotCardContainer/SpotCardContainer.js

// import css
import './SpotCardContainer.css';

// import component
import SpotCard from "./SpotCard/SpotCard";

//? SpotCardContainer component
const SpotCardContainer = () => {
  return (
    <div className="spot-card-container">
      {/* //? Spot Component */}
      <SpotCard />
    </div>
  );
};

// export SpotCardContainer component
export default SpotCardContainer;
