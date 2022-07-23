// backend/routes/bookings
const express = require('express');
const router = express.Router();

// TODO: Import model
const { Booking, User, Spot } = require('../db/models');

// TODO: Import authenticator
const { requireAuth } = require('../utils/auth');

// TODO: Edit a Booking
// Update and return an existing booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
  // deconstruct bookingId
  const { bookingId } = req.params;

  // deconstruct request body
  const {
    startDate,
    endDate
  } = req.body;

  // TODO: Require proper authorization: Booking must belong to the current user
  // get the current user info
  const currentUser = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find booking to authorize
  const bookingAuthorize = await Booking.findByPk(bookingId);

  if (bookingAuthorize && bookingAuthorize.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // TODO: Error response: Couldn't find a Booking with the specified id
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: currentUser.id
    }
  });

  if (!booking) {
    const err = Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Error response: Can't edit a booking that's past the end date
  // set end date variable for comparing with request body date
  const endDateCompare = booking.endDate.toISOString().split('T')[0];
  const dateNowCompare = new Date().toISOString().split('T')[0];
  const startDateCompare = booking.startDate.toISOString().split('T')[0];

  if (endDateCompare < dateNowCompare) {
    const err = Error("Past bookings can't be modified");
    err.status = 403;
    return next(err);
  }

  // TODO: Error response: Booking conflict
  if (booking) {
    // set comparison start/end date variable for comparing with request body date

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

  // TODO: Update and return an existing booking.
  const updateBooking = await booking.update({
    startDate,
    endDate
  });

  res.json(updateBooking);
});

// TODO: Delete a Booking
// Delete an existing booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  // deconstruct bookingId
  const { bookingId } = req.params;

  // TODO: Require proper authorization: Booking must belong to the
  // TODO: current user or the Spot must belong to the current user
  // get the current user info
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  });

  // find booking to authorize
  const bookingAuthorize = await Booking.findByPk(bookingId);

  if (bookingAuthorize && bookingAuthorize.userId !== req.user.id) {
    const err = Error("Forbidden");
    err.status = 403;
    return next(err);
  }

  // Spot must belong to the current user
  const spot = await Spot.findOne({
    where: {
      ownerId: user.id
    }
  });

  // Booking must belong to the current user
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: user.id
    }
  });

  if (!booking || !spot) {
    const err = Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }

  // TODO: Error response: Can't delete a booking that's past the start date
  const startDateCompare = booking.startDate.toISOString().split('T')[0];
  const dateNowCompare = new Date().toISOString().split('T')[0];

  if (startDateCompare < dateNowCompare) {
    const err = Error("Bookings that have been started can't be deleted");
    err.status = 403;
    return next(err);
  }

  // delete booking if found
  // booking.destroy();

  // TODO: Successful Response
  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
  });
});

module.exports = router;
