// backend/routes/images
const express = require('express');
const router = express.Router();

// TODO: Import model
const { Image, User, Spot, Review } = require('../db/models');

const { requireAuth } = require('../utils/auth');

// TODO: Delete an Image
// Delete an existing image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  // deconstruct imageId
  const { imageId } = req.params;

  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find image to authorize
  const imageAuthorize = await Image.findByPk(imageId);

  if (!imageAuthorize) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // TODO: Require proper authorization: Image must belong to the
  // TODO: current user through the image's imageableId and imageableType
  const getImage = await Image.findOne({
    where: {
      id: imageId
    }
  });

  let getSpot, getReview;

  if (getImage) {
    // if userId is not found in spot ... 
    getSpot = await Spot.findOne({
      where: {
        id: getImage.imageableId,
        ownerId: user.id
      }
    });

    // ... or if userId is not found in reviews
    getReview = await Review.findOne({
      where: {
        id: getImage.imageableId,
        userId: user.id
      }
    });

    // TODO: Successful Response
    getImage.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: res.statusCode
    });
  }

  // TODO: Error response: Couldn't find an Image with the specified id
  if (!(getSpot || getReview)) {
    const err = new Error("Image couldn't be found");
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
