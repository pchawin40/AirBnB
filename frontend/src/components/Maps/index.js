// frontend/src/components/Maps/index.js

// import react
import { useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import { getKey, getMapKey } from '../../store/maps';

// import component
import Maps from "./Maps";

//? MapContainer component: index for Maps
const MapContainer = () => {
  // get map key using selector
  const key = useSelector(getMapKey);

  // invoke dispatch
  const dispatch = useDispatch();

  // useEffect: get key for google map
  useEffect(() => {
    if (!key) dispatch(getKey());
  }, [dispatch, key]);

  // if there's no key, return null. else, return the Maps component using api key
  return!key ? null : <Maps apiKey={key} />
};

// export MapContainer
export default MapContainer;
