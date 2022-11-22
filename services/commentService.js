const commentsDao = require('../models/commentsDao');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const addComments = async (movie_id, rate, comment, id) => {
  await commentsDao.addComments(movie_id, rate, comment, id);
};

const getComments = async pstMovieNo => {
  const result = await commentsDao.getComments(pstMovieNo);
  return result;
};
module.exports = { addComments, getComments };
