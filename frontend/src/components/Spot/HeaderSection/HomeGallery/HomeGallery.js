// frontend/src/Components/Spot/HomeGallery/HomeGallery.js


// import react-redux
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';

// import css
import './HomeGallery.css';

// import context
import { Modal } from '../../../../context/Modal';

// import component
import ImageModal from './ImageModal';

//? HomeGallery component
const HomeGallery = () => {

  const [showImageModal, setShowImageModal] = useState(false);

  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
  const spots = useSelector(spotActions.getAllSpots);
  const spotState = useSelector(state => state.spots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : null;

  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
  }, [spotState]);

  return (
    spot &&
    <section className="gallery-image-container">
      <img
        onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
        src={spot.previewImage ? spot.previewImage : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
        alt={spot.name}
        onClick={_ => setShowImageModal(true)}
      />
      {
        // Show Image Modal
        showImageModal
        &&
        <Modal onClose={_ => setShowImageModal(false)}>
              <ImageModal setShowImageModal={setShowImageModal} />
        </Modal>
      }
    </section>
  );
};

// export HomeGallery component
export default HomeGallery;
