// backend/routes/users
const express = require('express');

const { Sequelize } = require('sequelize');

// TODO: Import User model
const { User, Spot, Image } = require('../db/models');
const router = express.Router();

const { requireAuth } = require('../utils/auth');

// TODO: GET route to get the current user and require authentication
router.get('/:userId', requireAuth, async (req, res) => {
  // get current user from userId
  const { userId } = req.params;

  const getUser = await User.getCurrentUserById(userId);

  return res.json(getUser);
});

// TODO: Get all Spots owned by the Current User
// return all spots owned (created) by the current user
router.get('/:userId/spots', requireAuth, async (req, res) => {
  // deconstruct userId from params
  const { userId } = req.params;

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

module.exports = router;
