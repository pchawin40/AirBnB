// frontend/src/store/images.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load iamges
// action
const LOAD_IMAGES = 'images/LOAD_IMAGES';

// action creator: load images
export const loadImages = images => {
  return {
    type: LOAD_IMAGES,
    images
  }
};

//? Action: Add Image
// action
const ADD_IMAGE = 'images/ADD_IMAGE';

// action creator: add image data
export const addImage = image => {
  return {
    type: ADD_IMAGE,
    image
  };
};

//? Action: Reset Images
// action
const RESET_IMAGES = 'images/RESET_IMAGES';

// action creator: reset image data
export const resetImage = () => {
  return {
    type: RESET_IMAGES
  };
};

//? Action: Delete Image
// action
const DELETE_IMAGE = 'images/DELETE_IMAGE';

// action creator: remove image from list of images
export const deleteImage = imageId => {
  return {
    type: DELETE_IMAGE,
    imageId
  };
};

/* --------- THUNKS -------- */
//? Thunk action to get all images
export const thunkLoadImagesBySpotId = spotId => async dispatch => {
  // fetch all images using csrfFetch
  const res = await csrfFetch(`/spots/${spotId}`);

  if (res.ok) {
    // parse res to images data
    const images = await res.json();

    // dispatch load images w/ fetched images data
    dispatch(loadImages(images));

    // return images
    return images;
  }
}

//? Thunk action to post image to spots
export const thunkAddImageToSpot = imageToAdd => async dispatch => {
  const {
    image
  } = imageToAdd;

  // define form data
  const formData = new FormData();

  formData.append("image", image);

  // post to backend route w/ form data
  const res = await csrfFetch(`/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  // if res is successful
  if (res.ok) {
    // parse res to json
    const image = await res.json();

    // dispatch addImage w/ parsed image
    dispatch(addImage(image));

    // return image
    return image;
  };
};

// export const thunkDeleteImage = 
