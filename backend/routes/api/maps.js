// ./backend/routes/maps.js

// import 
const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

//? POST route for '/api/maps/key'
// sends public key to backend to encrypt API key to prevent stealing of data
router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey })
});

// export google map router
module.exports = router;
