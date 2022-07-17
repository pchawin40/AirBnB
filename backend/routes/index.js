// backend/routes/index.js
// TODO: Create Express router, Test route, and export it to bottom of the file

const express = require('express');
const router = express.Router();

// TODO: Import routes/index.js file and connect it to router
const apiRouter = require('./api');
const apiUserRouter = require('./api/users');
const apiSessionRouter = require('./api/session');
const userRouter = require('./users');
const spotRouter = require('./spots');

// TODO: Log in current user with valid credentials
router.use('/api', apiRouter);
router.use('/login', apiSessionRouter);
router.use('/signup', apiUserRouter);
router.use('/users', userRouter);
router.use('/spots', spotRouter);

// TODO: Add a route to allow any developer to re-set CSRF token cookie
router.get('/api/csrf/restore', (req, res) => {
  const csrfToken = req.csrfToken();

  // setting cookie on response to csrfToken's method return
  res.cookie("XSRF-TOKEN", csrfToken);

  // send token as response for easy retrieval
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});


module.exports = router;
