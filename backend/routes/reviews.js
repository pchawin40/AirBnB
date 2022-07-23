// backend/routes/reviews
const express = require('express');

// TODO: Import model
const { Review, User, Image } = require('../db/models');
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

// TODO: Add an Image to a Review based on the Review's id
// Create and return a new image for a review specified by id.
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  // deconstruct reviewId
  const { reviewId } = req.params;

  // deconstruct url
  const { url } = req.body;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // TODO: Require proper authorization: Review must belong to the current user
  const review = await Review.findOne({
    where: {
      id: reviewId,
      userId: user.id
    }
  });

  // find review to authorize
  const reviewAuthorize = await Review.findByPk(reviewId);

  if (reviewAuthorize && reviewAuthorize.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // TODO: Error response: Couldn't find a Review with the specified id
  if (!review) {
    const err = Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Error response: Cannot add any more images because there is a 
  // TODO: maximum of 10 images per resource
  const images = await Image.findAll({
    where: {
      imageableId: reviewId
    }
  });

  // if there are more than 10 images for the current review
  if (images.length >= 10) {
    const err = Error("Maximum number of images for this resource was reached");
    err.status = 400;
    return next(err);
  }

  // TODO: Successful Response
  const image = await review.createImage({
    url
  });

  const imageCreated = await Image.findByPk(image.id);

  res.json(imageCreated);
});

// TODO: Edit a Review
// Update and return an existing review
router.put('/:reviewId', validateReview, requireAuth, async (req, res, next) => {
  // deconstruct reviewId
  const { reviewId } = req.params;

  // deconstruct review and stars
  const { review, stars } = req.body;

  // get current user
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  const reviewExist = await Review.findByPk(reviewId);

  // TODO: Error response: Couldn't find a Review with the specified id
  if (!reviewExist) {
    const err = Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  // find review to update bsaed on reviewId and current user id
  const getReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: currentUser.id
    }
  });

  // TODO: Require proper authorization: Review must belong to the current user
  if (!getReview) {
    const err = Error("Forbidden");
    err.status = 403;
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
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  // deconstruct spotId
  const { reviewId } = req.params;

  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find review to authorize
  const reviewAuthorize = await Review.findByPk(reviewId);

  // if reviewId does not belong to the current user, throw authorization error
  if (reviewAuthorize && reviewAuthorize.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // find review to delete
  const reviewToDestroy = await Review.findOne({
    where: {
      id: reviewId,
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
    statusCode: res.statusCode
  });
});

module.exports = router;
