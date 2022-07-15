// import validationResult from express-validator
const { validationResult } = require('express-validator');

// TODO: Define an Express middleware to call validationResult passing in request
// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  // validate passed request
  const validationErrors = validationResult(req);

  // if validation errors is has something...
  if (!validationErrors.isEmpty()) {
    // initialize errors and new error message from validation errors
    const errors = validationErrors.array().map(error => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';

    // call the next errorware
    next(err);
  }

  // else if no error, go to next middleware
  next();
}

// export handleValidationErrors
module.exports = {
  handleValidationErrors
};
