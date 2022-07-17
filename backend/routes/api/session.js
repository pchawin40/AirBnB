// backend/routes/api/session.js

// TODO: Create an Express router
const express = require('express');
const router = express.Router();

// TODO: Import setTokenCookie, restoreUser from auth.js
const { setTokenCookie, restoreUser } = require('../../utils/auth');

// TODO: Import User model from models
const { User } = require('../../db/models');

// TODO: Import 'check' function from 'express-validator' and 'handleValidationError'
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// TODO: Middleware to check keys and validate them
const validateLogin = [
  // check whether or not credential and password are empty
  // if one or more is empty, return an error response
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in
// TODO: add POST route to login user with given credential
router.post(['/', '/login'], validateLogin, async (req, res, next) => {
  // deconstruct credential and password from request body
  const { email, password } = req.body;

  // log the given user in
  let user = await User.login({ email, password });

  const getLoginUser = await User.scope('loginUser').findOne({
    where: user,
    attributes: {
      exclude: ['hashedPassword', 'createdAt', 'updatedAt']
    },
    raw: true
  });

  // if user does not exist, pass on to next errorware
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    return next(err);
  }

  // if user exist, set and return the user information
  await setTokenCookie(res, user);

  // TODO: Add token
  const { token } = req.cookies;

  return res.json({
    ...getLoginUser,
    token
  });
});

// TODO: add DELETE route to delete user with given credential
// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success ' });
});

// TODO: add GET route to return session user as JSON under 'user' key
// Restore session user
router.get('/', restoreUser, (req, res) => {
  // deconstruct user from request body
  const { user } = req;

  // if user exist, return json as safe object
  // else return an empty object
  user ? res.json({ user: user.toSafeObject() }) : res.json({});
});

// TODO: export router
module.exports = router;
