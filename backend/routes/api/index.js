// backend/routes/api/index.js
const router = require('express').Router();

// TODO: Test API Router
// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });
// });

// TODO: Test set-token-cookie
// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });

  setTokenCookie(res, user);
  return res.json({ user });
});

// TODO: Test restoreUser middleware and whether req.user key gets properly populated
// GET /api/restore-user

// Connect restoreUser middleware to API router
// - If current user session is valid, set req.user to user in database
// - If current user session is not valid, set req.user to null
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get('/restore-user', (req, res) => res.json(req.users));

// TODO: Test requireAuth middleware
// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');

router.get('/require-auth', requireAuth, (req, res) => res.json(req.user));

module.exports = router;
