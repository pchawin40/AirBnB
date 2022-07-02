// backend/routes/index.js
// TODO: Create Express router, Test route, and export it to bottom of the file

const express = require('express');
const router = express.Router();

// TODO: Add a route to allow any developer to re-set CSRF token cookie
router.get('/api/csrf/restore', async (req, res) => {
  const csrfToken = req.csrfToken();

  // setting cookie on response to csrfToken's method return
  res.cookie("XSRF-TOKEN", csrfToken);

  // send token as response for easy retrieval
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
