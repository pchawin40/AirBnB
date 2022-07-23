// backend/routes/users
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import User model
const { User, Spot, Image, Review, Booking } = require('../db/models');
const router = express.Router();

const { requireAuth } = require('../utils/auth');

// TODO: Get all of the Current User's Bookings
// Return all the bookings that the current user has made
router.get('/:userId/bookings', requireAuth, async (req, res, next) => {
  // deconstruct userId from params
  const { userId } = req.params;

  // get bookings from user id
  const bookings = await Booking.findAll({
    where: {
      userId
    },
    include: {
      model: Spot.scope('byBookings')
    },
  });

  // return successful response 
  res.json(
    { Bookings: bookings }
  );
});

// TODO: Returns all the reviews written by the current user
// returns all the reviews written by the current user
router.get('/:userId/reviews', requireAuth, async (req, res, next) => {
  // deconstruct userId from params
  const { userId } = req.params;

  // get review of given user id
  const reviews = await Review.findAll({
    where: {
      userId
    },
    include: [
      {
        model: User
      },
      {
        model: Spot.scope('byReviews'),
      }
    ]
  });



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

  // return successful response 
  res.json({
    Reviews: reviews
  });
});

// TODO: Get all Spots owned by the Current User
// return all spots owned (created) by the current user
router.get('/:userId/spots', requireAuth, async (req, res, next) => {
  // deconstruct userId from params
  const userId = Number(req.params.userId);

  // get the current user info
  const currentUserInfo = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // if userId is not the same as current user id, throw authorization error
  if (currentUserInfo.id !== userId) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  const getSpot = await Spot.findAll({
    where: {
      ownerId: userId
    },
    attributes: [
      '*',
      [Sequelize.literal('Images.url'), 'previewImage']
    ],
    include: {
      model: Image,
      attributes: []
    },
    raw: true
  });

  res.json({ Spots: getSpot });
});

// TODO: GET route to get the current user and require authentication
router.get('/:userId', requireAuth, async (req, res) => {
  // get current user from userId
  const { userId } = req.params;

  const getUser = await User.getCurrentUserById(userId);

  return res.json(getUser);
});

module.exports = router;
