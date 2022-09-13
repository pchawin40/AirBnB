import { useEffect } from "react";

import { useDispatch } from "react-redux";

import * as spotActions from '../../../../store/spots';

// import component
import MapContainer from "../../MapContainer";

//? MapModal
const MapModal = ({ setShowMapModal }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  return (
    <>
      {/* //* MapContainer */}
      <MapContainer setShowMapModal={setShowMapModal}/>
    </>
  );
};

// export component
export default MapModal;
