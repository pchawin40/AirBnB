// backend/routes/spots
const express = require('express');
const router = express.Router();

const { Sequelize } = require('sequelize');

// TODO: Import model
const { Spot, Image, Review, User, Booking } = require('../db/models');

const { requireAuth } = require('../utils/auth');

// TODO: Import 'check' function from 'express-validator' and 'handleValidationError'
const { check } = require('express-validator');
const { query } = require('express-validator/check');
const { handleValidationErrors } = require('../utils/validation');

//? import AWS S3 file
const { singlePublicFileUpload, singleMulterUpload } = require('../awsS3');

const validateSpot = [
  // check if address is valid 
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  // check if city is valid
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  // check if state is valid
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  // check if country is valid
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  // check if lat is valid
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  // check if longitude is valid
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  // check if name is valid
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name must be less than 50 characters'),
  // check that name is no longer than 50 characters
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  // check if description is valid
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  // check if price is valid
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  // check if review is valid
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  // check if stars exists and is an integer from 1 to 5
  check('stars')
    .exists({ checkFalsy: true })
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// TODO: Query Parameters
/*
* • page: integer, minimum: 0, maximum: 10, default: 0
* • size: integer, minimum: 0, maximum: 20, default: 20
* • minLat: decimal, optional
* • maxLat: decimal, optional
* • minLng: decimal, optional
* • maxLng: decimal, optional
* • minPrice: decimal, optional, minimum: 0
* • maxPrice: decimal, optional, minimum: 0
*/
const validateQuery = [
  query('page')
    .isInt({ min: 0 })
    .default(0)
    .optional()
    .withMessage('Page must be greater than or equal to 0'),
  check('size')
    .isInt({ min: 0 })
    .default(20)
    .optional()
    .withMessage('Size must be greater than or equal to 0'),
  check('minLat')
    .isDecimal()
    .optional()
    .withMessage('Minimum latitude is invalid'),
  check('maxLat')
    .isDecimal()
    .optional()
    .withMessage('Maximum latitude is invalid'),
  check('minLng')
    .isDecimal()
    .optional()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .isDecimal()
    .optional()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Minimum price must be greater than 0'),
  check('maxPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Maximum price must be greater than 0'),
  handleValidationErrors
];

// TODO: Get all Bookings for a Spot based on the Spot's id
// Returns all the bookings for a spot specified by id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // get spot from current user id
  const spotOwner = await Spot.findOne({
    where: {
      ownerId: user.id
    }
  });

  // TODO: Couldn't find a Spot with the specified id
  const findSpot = await Spot.findByPk(spotId);

  if (!findSpot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  let booking;

  // TODO: Successful Response: If you ARE NOT the owner of the spot.
  // if booking does not include current user id
  if (!spotOwner) {
    booking = await Booking.scope('notOwner').findAll({
      where: {
        spotId
      }
    });
  } else {
    // TODO: If you ARE the owner of the spot.
    booking = await Booking.findAll({
      where: {
        spotId
      },
      include: {
        model: User
      }
    });
  }

  res.json({
    Bookings: booking
  });
});

// TODO: Get all Reviews by a Spot's id
// Returns all the reviews that belong to a spot specified by its id
router.get('/:spotId/reviews', async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // get reviews
  const reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User
      }
    ]
  });

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!reviews.length) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // get array of images for current review 
  // reviews.map(async review => {
  for (const review of reviews) {
    // for all images per review
    const images = await Image.findAll({ where: { imageableId: review.id } });

    // put it into review images to be placed in reviews
    const reviewImages = [];

    // for each image in found images
    images.map(image => {
      // push all its attribute into here
      const currentImage = {
        ...image.dataValues
      };
      reviewImages.push(currentImage);
    });

    review.dataValues['Images'] = reviewImages;
  }

  res.json({
    Reviews: reviews
  });
});

// TODO: Get details of a Spot from an id
// Return the details of a spot specified by its id
router.get('/:spotId', async (req, res, next) => {
  // deconstruct spotId from req.params
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  const getSpot = await Spot.findOne({
    attributes: [
      '*'
    ],
    where: {
      id: spotId
    },
    raw: true,
    subQuery: false
  });

  const getReview = await Review.findOne({
    where: {
      spotId
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('stars')), 'numReviews'],
      [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('stars')), 1), 'avgStarRating']
    ],
    raw: true
  });

  // Error response: Couldn't find a Spot with the specified id
  if (!getSpot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Image from getSpot id
  const getImage = await Image.findAll({
    where: {
      imageableId: getSpot.id
    }
  });

  // TODO: Owner from getSpot id
  const getOwner = await User.findByPk(getSpot.ownerId);

  const spotDetail = {
    ...getSpot,
    ...getReview,
    Images: getImage,
    Owners: getOwner
  };

  // successful response
  res.json(spotDetail)
});

// Return all spots
router.get('/', validateQuery, async (req, res) => {
  // import Op
  const { Op } = require('sequelize');

  // TODO: deconstruct query
  // page and size
  let page = Number(req.query.page);
  let size = Number(req.query.size);

  if (isNaN(page) || page <= 0) page = 0;
  if (isNaN(size) || size < 0) size = 20;

  if (page > 10) page = 0;
  if (size > 20) size = 20;

  const limit = size;
  const offset = size * (page - 1) >= 0 ? size * (page - 1) : 0;

  /** 
   * Search parameter:
   * - minLat
   * - maxLat
   * - minLng
   * - maxLng
   * - minPrice
   * - maxPrice
  */
  const where = {};

  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  if (minLat) where.lat = { [Op.gte]: Number(minLat) };
  if (maxLat) where.lat = { [Op.lte]: Number(maxLat) };
  if (minLng) where.lng = { [Op.gte]: Number(minLng) };
  if (maxLng) where.lng = { [Op.lte]: Number(maxLng) };
  if (minPrice) where.price = { [Op.gte]: Number(minPrice) };
  if (maxPrice) where.price = { [Op.lte]: Number(maxPrice) };

  // find all with query and search parameter (if exists)
  const spots = await Spot.findAll({
    include: {
      model: Image,
      attributes: []
    },
    where,
    limit,
    offset
  });

  // TODO: Successful response
  res.json({
    "Spots": spots,
    page,
    size
  });
});


// TODO: Require proper authorization: Spot must NOT belong to the current user
// get the current user info

let user;

const authorization = async (req, res, next) => {
  user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  next();
}

// TODO: Create a Booking from a Spot based on the Spot's id
// Create and return a new booking from a spot specified by id.
router.post('/:spotId/bookings', requireAuth, authorization, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // deconstruct request body
  const {
    startDate,
    endDate
  } = req.body;

  // get spot
  const spot = await Spot.findByPk(spotId);

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spot.ownerId === user.id) {
    const err = Error("Spot must NOT belong to the current user");
    return next(err);
  }

  // TODO: Error response: Body validation errors
  if (endDate <= startDate) {
    const err = Error("Validation error");
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot be on or before startDate"
    };
    return next(err);
  }

  // TODO: Error response: Booking conflict
  const findBooking = await Booking.findOne({
    where: {
      spotId,
      userId: user.id,
    }
  });

  if (findBooking) {
    // set comparison start/end date variable for comparing with request body date
    const startDateCompare = findBooking.startDate.toISOString().split('T')[0];
    const endDateCompare = findBooking.endDate.toISOString().split('T')[0];

    // if booking start date or end date exist with given dates
    if (startDateCompare === startDate || endDateCompare === endDate) {
      const err = Error("Sorry, this spot is already booked for the specified dates");
      err.status = 403;
      err.errors = {};

      // start date conflicts
      if (startDateCompare === startDate) {
        err.errors.startDate = "Start date conflicts with an existing booking";
      }

      // end date conflicts
      if (endDateCompare === endDate) {
        err.errors.endDate = "End date conflicts with an existing booking";
      }

      return next(err);
    }
  }

  // create booking with given request time
  const booking = await Booking.create({
    spotId,
    userId: user.id,
    startDate,
    endDate
  });

  // TODO: Successful Response
  res.json(booking);
});

// TODO: Add an Image to a Spot based on the Spot's id
// Create and return a new image for a spot specified by id.
router.post('/:spotId/images', singleMulterUpload("workingImage"), requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // deconstruct url
  // const { url } = req.body;
  const url = req.file ? await singlePublicFileUpload(req.file) : null;
  
  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find spot to authorize
  const spotAuthorize = await Spot.findByPk(spotId);

  if (spotAuthorize && spotAuthorize.ownerId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // TODO: Require proper authorization: Spot must belong to the current user
  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: user.id
    }
  });

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Successful Response
  const image = await spot.createImage({
    url
  });

  const imageCreated = await Image.findByPk(image.id);

  return res.json(imageCreated);
});

// TODO: Create a Review for a Spot based on the Spot's id
// Create and return a new review for a spot specified by id
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // deconstruct request body
  const { review, stars } = req.body;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // get spot by spotId
  const spot = await Spot.findByPk(spotId);

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // get user by current user id
  const getReview = await Review.findOne({
    where: {
      userId: user.id,
      spotId
    }
  });

  // TODO: Error response: Review from the current user already exists for the Spot
  if (getReview) {
    const err = Error("User already has a review for this spot");
    err.status = 403;
    return next(err);
  }

  // create review by spot id
  const spotReview = await Review.create({
    userId: user.id,
    spotId,
    review,
    stars
  });

  // successful response
  res.json(
    spotReview
  );
});

// TODO: Create a Spot
// Creates and returns a new Spot
router.post('/', singleMulterUpload("previewImage"), requireAuth, validateSpot, async (req, res) => {

  // deconstruct body
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const previewImage = req.file ? await singlePublicFileUpload(req.file) : null;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // create spot
  const postSpot = await Spot.create({
    ownerId: user.id,
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
  });

  const spotReturn = await Spot.findByPk(postSpot.id);

  // return spot created
  res.status(201);
  res.json(spotReturn);
});

// TODO: Edit a Spot
// Updates and returns an existing spot
router.put('/:spotId', singleMulterUpload("previewImage"), requireAuth, validateSpot, async (req, res, next) => {
  // router.get('/test/:spotId', async (req, res) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // modify spot with given body
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  let previewImage;

  if (req.file) {
    previewImage = await singlePublicFileUpload(req.file);
  } else {
    previewImage = req.body.previewImage;
  }

  // find spot to authorize
  const spotAuthorize = await Spot.findByPk(spotId);

  // if spotId does not belong to the current user, throw authorization error
  if (spotAuthorize && spotAuthorize.ownerId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find all spots with current user id
  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: currentUser.id
    }
  });

  // TODO: Couldn't find a Spot with the specified id
  if (!spot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  
  // update spot with deconstructed request body
  const updateSpot = await spot.update({
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
  });

  const spotReturn = await Spot.findByPk(updateSpot.id);

  // TODO: Successful response: return spot in response via json format
  return res.json(spotReturn);
});

// TODO: Delete a Spot
// Deletes an existing spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find spot to authorize
  const spotAuthorize = await Spot.findByPk(spotId);

  // if spotId does not belong to the current user, throw authorization error
  if (spotAuthorize && spotAuthorize.ownerId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // find spot and delete
  const spotToDestroy = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: currentUser.id
    }
  });

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!spotToDestroy) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Deletes an existing spot.
  spotToDestroy.destroy();

  // return successful response
  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
  });

});

module.exports = router;
