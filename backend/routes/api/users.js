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
    .withMessage('Please provide a valid email.'),
  // check that password is 6 characters or more
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// TODO: POST router to sign up user and return JSON response with user information
// Sign up
router.post('/', validateSignup, async (req, res) => {
  // deconstruct credential and password from req.body
  const { email, password } = req.body;

  // call signup static method on User model
  const user = await User.signup({ email, password });

  // set token user with signed-up user
  await setTokenCookie(res, user);


  
  // return the created user via json
  return res.json({
    user
  });
});

// export router
module.exports = router;
