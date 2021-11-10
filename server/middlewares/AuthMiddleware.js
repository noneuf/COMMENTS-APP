const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) return res.json({ error: 'User not logged in!' });
  try {
    const validToken = verify(accessToken, 'importantsecret'); //verify is a jwt function that check that the token is valid
    req.user = validToken;
    if (validToken) {
      return next(); //his will proceed the code after the usage of this middleware
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
