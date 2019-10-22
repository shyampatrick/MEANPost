const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('TEST');
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret-TODO-gen');
    req.userData = { email: decodedToken, userId: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Auth failed: Not Authenticated' });
  }
};
