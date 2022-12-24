// import react
import { useEffect, useState, useRef } from "react";

// import react-redux
import { useDispatch, useSelector } from "react-redux";

// import react-router-dom
import { useParams } from "react-router-dom";

// import store
import * as spotActions from '../../../../../store/spots';
import * as sessionActions from '../../../../../store/session';

// import css
import './ImageModal.css';

//? Edit Image Modal component
const ImageModal = ({ setShowImageModal }) => {

  // get spot id
  const { spotId } = useParams();

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke ref
  const ref = useRef();

  // state
  const imageState = useSelector(spotActions.getImagesBySpot(spotId));
  const [images, setImages] = useState(imageState);
  const [newImages, setNewImages] = useState([]);

  // get session user
  const sessionUser = useSelector(sessionActions.getSessionUser);
  // get spot owner
  const spotOwner = useSelector(spotActions.getSpotOwner(spotId));

  // get all images from current spot (/spots/:spotId GET)
  // const images
  useEffect(() => {
    // nothing for now
  }, [dispatch, spotId]);

  // update image if imageState changes
  useEffect(() => {
    setImages(imageState);
  }, [imageState]);


  //? handleImageDelete: function to handle delete of image
  const handleImageDelete = async image => {
    const choice = window.confirm("Are you sure you want to delete this image?");
    if (!choice) return;
    dispatch(spotActions.thunkDeleteImage(image.id, spotId))
      .then(() => dispatch(spotActions.thunkGetSpots()));
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
      .then(() => dispatch(spotActions.thunkGetSpots()))
      .catch(
        async res => {
          // parse error data
          const data = await res.json();

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

  /**
   * Handler functions
   */
  const checkIfSpotOwner = () => {
    return (
      sessionUser && spotOwner &&
      sessionUser.id === spotOwner
    );
  };

  return (
    Array.isArray(images) &&
    <section className="section-container">
      <div className="fa-x-container" onClick={_ => setShowImageModal(false)}>
        <i className="fa-solid fa-x fa-xl"></i>
      </div>
      {/* //? Add existing images  */}
      {
        checkIfSpotOwner() &&
        (
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
                    <h3> Click button to add images</h3>
                  </>
              }
            </div>
          </form>
        )
      }
      <section className="image-figure-container" id={`lone-figure-container-${images.length === 1}`}>
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
            images.map((image, index) =>
            (
              <figure
                key={index + " " + image.id}
                id={`lone-container-${images.length === 1}`}
                className="image-figure"
              >
                <img
                  src={image.url}
                  onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
                  alt={image.id}
                  className="modal-image"
                  onClick={_ => checkIfSpotOwner() && handleImageDelete(image)}
                />
                {
                  checkIfSpotOwner() &&
                  <p className="delete-image-text">Delete</p>
                }
              </figure>
            ))
        }
      </section>
    </section>
  );
};

// export component
export default ImageModal;
