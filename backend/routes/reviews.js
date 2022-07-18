// backend/routes/reviews
const express = require('express');

// TODO: Import model
const { Review, User } = require('../db/models');
const router = express.Router();

// TODO: Import requireAuth from utils
const { requireAuth } = require('../utils/auth');

// TODO: Import 'check' function from 'express-validator' and 'handleValidationError'
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

// review validator
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// TODO: Edit a Review
// Update and return an existing review
router.put('/:reviewId', validateReview, requireAuth, async (req, res, next) => {
  // deconstruct reviewId
  const { reviewId } = req.params;

  // deconstruct review and stars
  const { review, stars } = req.body;

  // TODO: Require proper authorization: Must belong to current user
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find review to update bsaed on reviewId and current user id
  const getReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: currentUser.id
    }
  });

  // TODO: Error response: Couldn't find a Review with the specified id
  if (!getReview) {
    const err = Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Update and return an existing review
  const updateReview = await getReview.update({
    review,
    stars
  });

  // TODO: Successful response
  res.json(updateReview);
});

// TODO: Delete a Review
// Delete an existing review
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find review to delete
  const reviewToDestroy = await Review.findOne({
    where: {
      id: spotId,
      userId: currentUser.id
    }
  });

  // TODO: Error response: Couldn't find a Review with the specified id
  if (!reviewToDestroy) {
    const err = Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // Delete an existing review
  reviewToDestroy.destroy();

  // TODO: Successful response
  res.json({
    message: "Successfully deleted",
    statusCode: res.status
  });
});

module.exports = router;
