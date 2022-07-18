// backend/routes/spots
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import spot model
const { Spot, Image, Review, User } = require('../db/models');
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
