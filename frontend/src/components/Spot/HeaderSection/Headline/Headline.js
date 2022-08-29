// import react-redux
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';

//? Headline component
const Headline = () => {
  const dispatch = useDispatch();
  
  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
  const spot = useSelector(spotActions.getSpotById(spotId));

  

  // get spot by spot id
  return (
    // if spot is available, return spot
    spot &&
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
