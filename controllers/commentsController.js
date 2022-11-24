const commentService = require('../services/commentService');

const addComments = async (req, res) => {
  const { movie_id } = req.body;
  const { rate } = req.body;
  const { comment } = req.body;

  console.log(req.userInfo);
  const id = req.userInfo.id;
  console.log(id);
  const REQUIRED_KEYS = {
    movie_id,
  };
  Object.keys(REQUIRED_KEYS).map(key => {
    if (!REQUIRED_KEYS[key]) {
      const error = new Error(`KEY_ERROR: ${key}`);
      error.statusCode = 400;
      throw error;
    }
  });

  await commentService.addComments(id, movie_id, rate, comment);
  res.status(200).json({ message: 'success add movie comment' });
};

const getComments = async (req, res) => {
  const { pstMovieNo } = req.query;
  const getComments = await commentService.getComments(pstMovieNo);
  res.status(200).json({ data: getComments });
};

module.exports = { addComments, getComments };
