const commentsDao = require('../models/commentsDao');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const addComments = async (id, movie_id, rate, comment) => {
  await commentsDao.addComments(id, movie_id, rate, comment);
};

const getComments = async pstMovieNo => {
  const result = await commentsDao.getComments(pstMovieNo);
  result.forEach(unit => {
    unit.account_id = unit.account_id.slice(0, -2) + '**';
  });
  return result;
};
module.exports = { addComments, getComments };
