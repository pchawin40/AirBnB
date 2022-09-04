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
import { useImage } from '../../../../context/ImageContext';
import { Modal } from '../../../../context/Modal';

// import component
import ImageModal from '../../ImageModal';

//? HomeGallery component
const HomeGallery = () => {
  const {
    editImageModal, setEditImageModal
  } = useImage();

  const dispatch = useDispatch();

  // get spot id
  const { spotId } = useParams();

  // get spot by spot id
  const spots = useSelector(spotActions.getAllSpots);
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : null;

  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));
  }, [dispatch, spotId]);

  //? On handling image click, open modal for image
  const handleImageClick = () => setEditImageModal(true);

  return (
    spot &&
    <section className="gallery-image-container" onClick={handleImageClick}>
      <img
        onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
        src={spot.previewImage ? spot.previewImage : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
        alt={spot.name}
      />
      {
        // Show Image Modal
        editImageModal
        &&
        <Modal onClose={_ => setEditImageModal(false)}>
          <ImageModal />
        </Modal>
      }
    </section>
  );
};

// export HomeGallery component
export default HomeGallery;
