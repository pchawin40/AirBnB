// backend/routes/index.js
// TODO: Create Express router, Test route, and export it to bottom of the file

const express = require('express');
const router = express.Router();


// TODO: Import routes/index.js file and connect it to router
const apiRouter = require('./api');
const userRouter = require('./users');

// TODO: Log in current user with valid credentials
router.use(['/api', '/login'], apiRouter);
router.use('/users', userRouter);


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
