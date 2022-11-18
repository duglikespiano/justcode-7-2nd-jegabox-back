const likesDao = require('../models/likesDao');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const addLikes = async (movie_id, token) => {
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await likesDao.addLikes(user_id, movie_id);
};

const removelikes = async (movie_id, token) => {
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await likesDao.removelikes(user_id, movie_id);
};
module.exports = { addLikes, removelikes };
