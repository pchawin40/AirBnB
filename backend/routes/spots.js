// backend/routes/spots
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import spot model
const { Spot, Image } = require('../db/models');
const router = express.Router();

// Return all spots
router.get('/', async (req, res) => {
  // const spots = await Spot.find(1);
  const spots = await Spot.findAll({
    attributes: [
      '*',
      [Sequelize.literal('"Images"."url"'), 'previewImage']
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

module.exports = router;
