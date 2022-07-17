// backend/routes/spots
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import spot model
const { Spot, Image, Review, User } = require('../db/models');
const router = express.Router();

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
    'Spots': spots
  });
});

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
  const getOwner = await User.scope('noToken').findByPk(getSpot.ownerId);

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

module.exports = router;
