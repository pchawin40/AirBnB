// frontend/src/store/spots.js

// import csrfFetch
import { csrfFetch } from './csrf';

/* --------- ACTIONS -------- */
//? Action: Load spots
// action
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

// action creator: load spots data
export const loadSpots = spots => {
  return {
    type: LOAD_SPOTS,
    spots
  }
};

//? Action: Add spot
// action
const ADD_SPOT = 'spots/ADD_SPOT';

// action creator: add spot data
export const addSpot = spot => {
  return {
    type: ADD_SPOT,
    spot
  }
}

//? Action: Reset Spots
// action 
const RESET_SPOT = 'spots/RESET_SPOT';

// action creator: reset spots data
export const resetSpot = () => {
  return {
    type: RESET_SPOT
  }
}

//? Action: Delete Spot
// action
const DELETE_SPOT = 'spots/DELETE_SPOT';

// action creator: remove spot from list of spots
export const deleteSpot = spotId => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

//? Action: Add Images (to current spot)
// action
const ADD_IMAGES = 'spots/ADD_IMAGES';

// action creator: remove image from list of images given by current spot
export const addImages = (images, spotId) => {
  return {
    type: ADD_IMAGES,
    images,
    spotId
  };
};

//? Action: Delete Image (of current spot)
// action
const DELETE_IMAGE = 'spots/DELETE_IMAGE';

// action creator: remove image from list of images given by current spot
export const deleteImage = (imageId, spotId) => {
  return {
    type: DELETE_IMAGE,
    imageId,
    spotId
  };
};

/* --------- THUNKS -------- */
//? Thunk action to get all spots
export const getSpots = () => async dispatch => {
  // fetch all spots using csrfFetch
  const res = await csrfFetch('/spots');

  if (res.ok) {
    // parse res to spots data
    const spots = await res.json();

    // dispatch load spots w/ fetched spots data 
    dispatch(loadSpots(spots));

    // return spots
    return spots;
  }
};

export const getSpotBySpotId = spotId => async dispatch => {
  const res = await csrfFetch(`/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();

    dispatch(loadSpots(spot));

    return spot;
  }
};

//? Thunk action to post spot
export const addASpot = spotToAdd => async dispatch => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = spotToAdd;

  // defining form data
  const formData = new FormData();

  formData.append("address", address);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("country", country);
  formData.append("lat", lat);
  formData.append("lng", lng);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);

  // single file image upload
  if (previewImage) formData.append("previewImage", previewImage);

  // hit backend route w/ form data
  const res = await csrfFetch('/spots', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  // if res is successful:
  if (res.ok) {
    // parsed res to json
    const spot = await res.json();

    // dispatch addSpot w/ parsed spot
    dispatch(addSpot(spot));

    // return spot
    return spot;
  }
}

//? Thunk action to edit spot
export const thunkEditSpot = (spotToEdit, spotId) => async dispatch => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage
  } = spotToEdit;

  // defining form data
  const formData = new FormData();
  const imageForm = new FormData();

  formData.append("address", address);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("country", country);
  formData.append("lat", lat);
  formData.append("lng", lng);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);

  //? check if url
  function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  // if preview image is not url, then add a different formdata object name
  (!isURL(previewImage) && previewImage) ?
    formData.append("previewImage", previewImage)
  :
    formData.append("image", previewImage)
  ;

  // hit signup backend route w/ form data
  const res = await csrfFetch(`/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  if (res.ok) {
    // parse res to json
    const spot = await res.json();

    // dispatch addSpot w/ parsed spot
    dispatch(addSpot(spot));

    // return spot
    return spot;
  }
}

//? Thunk action to delete spot
export const thunkDeleteSpot = spotId => async dispatch => {
  // fetch csrfFetch to delete spot
  const res = await csrfFetch(`/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    // parse res to json
    const spot = await res.json();

    // dispatch deleteSpot
    dispatch(deleteSpot(spot));

    // return spot
    return spot;
  }
}

//? Thunk action to add image (given by current spot)
export const thunkAddImage = (images, spotId) => async dispatch => {
  // define form data
  const formData = new FormData();

  //* for multiple image files
  if (images && images.length !== 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append("workingImages", images[i]);
    }
  }

  const res = await csrfFetch(`/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  if (res.ok) {
    // parse res to json
    const imageData = await res.json();

    // dispatch addImage w/ parsed spot
    dispatch(addImages(imageData, spotId));

    // return images
    return imageData;
  } 

  console.log("FAILED");

  return images;
}

//? Thunk action to delete image (given by current spot)
export const thunkDeleteImage = (imageId, spotId) => async dispatch => {
  // fetch csrfFetch to delete image
  const res = await csrfFetch(`/images/${imageId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    // parse res to json
    const image = await res.json();

    // dispatch deleteImage
    dispatch(deleteImage(imageId, spotId));

    return image
  }
}


/* --------- SELECTOR FUNCTIONS -------- */
export const getAllSpots = state => state.spots.Spots;

export const getSpotById = spotId => state => Object.values(state.spots.Spots).find(spot => spot.id === Number(spotId));

// get all images
export const getImagesBySpot = state => Object.values(state.spots.Images);

export const getSpotOwner = () => state => state.spots.Owners ? state.spots.Owners : state.spots;

/* --------- REDUCERS -------- */
const initialSpots = [];

const spotsReducer = (state = initialSpots, action) => {
  // newSpots
  const newSpots = { ...state};

  switch (action.type) {
    //? case: add spot
    case ADD_SPOT:
      newSpots[action.spot.id] = action.spot;
      return newSpots;
    //? case: reset spot
    case RESET_SPOT:
      return initialSpots;
    //? case: remove spot
    case DELETE_SPOT:
      delete newSpots[action.spot];
      return newSpots;
    //? case: remove image
    case DELETE_IMAGE:
      delete Object.values(newSpots.Images).find(image => image.id === action.imageId);
      return newSpots;
    //? case: add image
    case ADD_IMAGES:
      return { ...state, images: action.images };
    //? default case
    default:
      return Object.assign({}, newSpots, action.spots);
  }
};

//export reducer
export default spotsReducer;
