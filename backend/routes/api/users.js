// TODO: Create and export an Express router 

// backend/routes/api/users.js
const express = require('express');

// TODO: Import SetTokenCookie, requireAuth
const { setTokenCookie, requireAuth } = require('../../utils/auth');

// TODO: import User model
const { User } = require('../../db/models');

const router = express.Router();

// TODO: import 'check' from express-validator and 'handleValidationError' function
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// TODO: middleware to check and validate users keys 
const validateSignup = [
  // check if email is valid
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  // check first name is valid
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  // check last name is valid
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  // check that password is 6 characters or more
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// TODO: POST router to sign up user and return JSON response with user information
// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  // deconstruct credential and password from req.body
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.getCurrentUserByEmail(email);

  if (userExist) {
    const err = new Error("User already exists");
    err.status = 403;
    err.errors = {
      email: "User with that email already exists"
    };
    return next(err);
  }

  // TODO: cannot register user with already existing email
  // call signup static method on User model
  const user = await User.signup({ firstName, lastName, email, password });

  // set token user with signed-up user
  const token = setTokenCookie(res, user);

  // return current user info
  const registerUserInfo = await User.scope('currentUser').findByPk(user.id);
  registerUserInfo.dataValues['token'] = token;

  // return the created user via json
  return res.json(
    registerUserInfo
  );
});

// export router
module.exports = router;
