// import react-redux
import { useSelector } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';

//? Headline component
const Headline = () => {
  // get spot id
  const { spotId } = useParams();

  // const spot = useSelector(spotActions.getSpotById(spotId));
  const spot = useSelector(spotActions.getAllSpots)[spotId];



  // get spot by spot id
  return (
    <>
      <div className="headline_div_1">
        {spot.name}
      </div>
      <div className="headline_div_2">
        <div className="div_2_inner_div_1">
          {/* review by spot id */}

          {/* # of reviews */}

          {/* location */}
        </div>

        <div className="div_2_inner_div_2">
          {/* share */}
          {/* save */}
        </div>
      </div>
    </>
  );
};

// export component
export default Headline;
