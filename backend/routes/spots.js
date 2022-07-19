// backend/routes/spots
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import model
const { Spot, Image, Review, User, Booking } = require('../db/models');
const router = express.Router();

const { requireAuth } = require('../utils/auth');

// TODO: Import 'check' function from 'express-validator' and 'handleValidationError'
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

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
    .withMessage('Name is required'),
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
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
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
      },
      {
        model: Image
      }
    ]
  });

  // TODO: Error response: Couldn't find a Spot with the specified id
  if (!reviews.length) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
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

  // find Spot by ID
  const getSpot = await Spot.findByPk(spotId, {
    raw: true
  });

  // Error response: Couldn't find a Spot with the specified id
  if (!getSpot) {
    const err = Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: numReviews = aggregate count
  const numReviews = await Review.count();

  // TODO: avgStarRating selected individually from getSpot
  const avgStarRating = await Spot.findOne({
    where: {
      id: getSpot.id
    },
    attributes: [
      Sequelize.col('avgStarRating')
    ],
    raw: true
  });

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
    numReviews,
    avgStarRating: avgStarRating.avgStarRating,
    Images: getImage,
    Owners: getOwner
  };

  // successful response
  res.json(spotDetail)
});

// Return all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: [
      '*',
      [Sequelize.literal('Images.url'), 'previewImage']
    ],
    include: {
      model: Image,
      attributes: [],
    },
    raw: true
  });

  res.json({
    "Spots": spots
  });
});

// TODO: Create a Booking from a Spot based on the Spot's id
// Create and return a new booking from a spot specified by id.
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
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

  // TODO: Require proper authorization: Spot must NOT belong to the current user
  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

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
      userId: user.id
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
router.post('/', requireAuth, validateSpot, async (req, res) => {
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
    price
  });

  // return spot created
  res.status(201);
  res.json(postSpot);
});

// TODO: Edit a Spot
// Updates and returns an existing spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
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
    price
  });

  // TODO: Successful response: return spot in response via json format
  return res.json(updateSpot);
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
