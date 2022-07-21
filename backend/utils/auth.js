// TODO: Import utilities package
// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// TODO:This function sets the JWT cookie after a user is logged in or signed up
const setTokenCookie = (res, user) => {
  // Create the token
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  // check whether current session is in production
  const isProduction = process.env.NODE_ENV === "production";

  // Set token cookies
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  // return token w/ created cookies
  return token;
}

// TODO: This middleware function restores the session user based on JWT cookie contents 
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  // search database for a User with id in payload
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    // if error exist, go to next middleware
    if (err) return next();

    // if User found, save user to a key of 'user' onto the request
    try {
      const { id } = jwtPayload.data;

      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      // If user not found, clear response's token cookie and set to null (req.users)
      res.clearCookie('token');

      return next();
    }

    // clear cookie if user not found
    if (!req.user) res.clearCookie('token');
    return next();
  });
};

// TODO: This middleware requires session user to be authenticated before accessing a route
const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.status = 401;
    return next(err);
  }
];

// TODO: Export all function at bottoms of file
module.exports = { setTokenCookie, restoreUser, requireAuth };
