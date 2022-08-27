// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

// Connect maps router 
const mapsRouter = require('./maps');

router.use('/maps', mapsRouter);

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

// TODO: Connect all routers exported from session.js and users.js
router.use(['/session', '/'], sessionRouter);
router.use('/users', usersRouter);

// restore user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// testing /test router with POST method
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
