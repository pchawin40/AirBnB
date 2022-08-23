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
const reviewRouter = require('./reviews');
const bookingRouter = require('./bookings');
const imageRouter = require('./images');

const { restoreUser } = require('../utils/auth');

// restore current user
router.use(restoreUser);

// TODO: Log in current user with valid credentials
router.use('/login', apiSessionRouter);
router.use('/signup', apiUserRouter);
router.use('/users', userRouter);
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/images', imageRouter);
router.use('/api', apiRouter);

// TODO: Restore XSRF-TOKEN Cookie
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve frontend index.html and any route that don't start w/ api
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // serve static asset in frontend's build folder
  router.use(express.static(path.resolve('../frontend/build')));

  // serve frontend's index.html file at all other routes not starting w/ /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
  // else if in development (not in production)
} else {
  // get token from /api/csrf/restore file
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

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
