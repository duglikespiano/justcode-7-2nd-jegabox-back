const jwt = require('jsonwebtoken');

async function authMiddleware(req, _, next) {
  const token = req.headers.authorization;
  const decodedToken = decodeToken(token);
  req.userInfo = { id: decodedToken.id };
  next();
}

function decodeToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    console.log(`err`);
    throw { status: 401, message: 'unauthorized' };
  }
}

module.exports = {
  authMiddleware,
};
