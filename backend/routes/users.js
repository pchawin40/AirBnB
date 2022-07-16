// backend/routes/users
const express = require('express');

// TODO: Import User model
const { User } = require('../db/models');
const router = express.Router();

const { requireAuth } = require('../utils/auth');

// TODO: GET route to get the current user and require authentication
router.get('/:userId', requireAuth, async (req, res) => {
  // get current user from userId
  const { userId } = req.params;

  const getUser = await User.getCurrentUserById(userId);

  return res.json(getUser);
});

module.exports = router;
