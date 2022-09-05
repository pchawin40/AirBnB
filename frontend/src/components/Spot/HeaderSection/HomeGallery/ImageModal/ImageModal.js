// import react
import { useEffect, useState, useRef } from "react";

// import react-redux
import { useDispatch, useSelector } from "react-redux";

// import react-router-dom
import { useParams } from "react-router-dom";

// import store
import * as spotActions from '../../../../../store/spots';

// import css
import './ImageModal.css';

//? Edit Image Modal component
const ImageModal = ({ setShowImageModal }) => {

  // get spot id
  const { spotId } = useParams();

  // invoke dispatch
  const dispatch = useDispatch();
  
  const ref = useRef();

  // state
  const imageState = useSelector(spotActions.getImagesBySpot);
  const [images, setImages] = useState(imageState);
  const [newImages, setNewImages] = useState([]);

  // get all images from current spot (/spots/:spotId GET)
  // const images
  useEffect(() => {
    dispatch(spotActions.getSpotBySpotId(spotId));
  }, [dispatch, spotId]);


  useEffect(() => {
    setImages(imageState);
  }, [imageState]);


  //? handleImageDelete: function to handle delete of image
  const handleImageDelete = async image => {
    const choice = window.confirm("Are you sure you want to delete this image?");
    if (!choice) return;
    dispatch(spotActions.thunkDeleteImage(image.id, spotId));
    dispatch(spotActions.getSpotBySpotId(spotId));
  };

  //? handle form submit
  const handleImageSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    const fileUpload = Object.values(newImages);
    
    // reset new images
    setNewImages("");

    ref.current.value = "";

    dispatch(spotActions.thunkAddImage(fileUpload, spotId))
      .then(() => dispatch(spotActions.getSpotBySpotId(spotId)))
      .catch(
      async res => {
        // parse error data
        const data = await res.json();

        console.log("error here");

        // set any error data into validation errors
        if (data.errors) alert(Object.values(data.errors));

        return;
      }
    );
  }

  //? updateFiles: multiple file update function
  const updateFiles = e => {
    const files = e.target.files;
    setNewImages(files);
  }

  return (
    Array.isArray(images) &&
    <section className="section-container">
      <div className="fa-x-container" onClick={_ => setShowImageModal(false)}>
        <i className="fa-solid fa-x fa-xl"></i>
      </div>
      {/* //? Add existing images  */}
      <form className="add-existing-images-container" onSubmit={handleImageSubmit}>
        {/* //? Multiple File Upload */}
        <label className="exist-add-image-label">
          {/* Multiple Upload */}
          <input
            type="file"
              multiple
              ref={ref}
            className="exist-add-image-input"
            onChange={updateFiles} />
        </label>
        {/* //? Plus Container */}
        <div className="image-add-edit-button-container">
          {
            // console.log("newImages", newImages) &&
            newImages.length > 0 ?
              <>
                <button
                  className="owner-add-image-button"
                  type="submit"
                >
                  Add Images
                </button>

                <button
                  className="owner-cancel-image-button"
                  onClick={_ => setNewImages([])}
                >
                  Cancel
                </button>
              </>
              :
              <>
                <h3> Click here to add images</h3>
              </>
          }
        </div>
      </form>
      <section className="image-figure-container">
        {
          images.length < 1 ?
            <aside className="no-image-aside">
              <h3>
                No Images currently available for this spot. Would you like to add an image(s)?
              </h3>
              <span className="fa-images-container">
                <i className="fa-regular fa-images fa-2xl"></i>
                <i className="fa-solid fa-plus fa-2xl"></i>
              </span>

              {/* //? Multiple File Upload */}
              <label>
                {/* Multiple Upload */}
                <input
                  type="file"
                  multiple
                  className="add-images-input"
                  onChange={updateFiles} />
              </label>
            </aside>
            :
            images.map(image =>
            (
              <figure
                key={image.id}
                className="image-figure"
              >
                <img
                  src={image.url}
                  alt={image.id}
                  className="modal-image"
                  onClick={_ => handleImageDelete(image)}
                />
                <p className="delete-image-text">Delete</p>
              </figure>
            ))
        }
      </section>
    </section>
  );
};

// export component
export default ImageModal;
