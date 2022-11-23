const commentService = require('../services/commentService');

const addComments = async (req, res) => {
  try {
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

    await commentService.addComments(movie_id, rate, comment, id);
    res.status(200).json({ message: 'success add movie comment' });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { pstMovieNo } = req.query;
    const getComments = await commentService.getComments(pstMovieNo);
    res.status(200).json({ data: getComments });
  } catch (err) {
    console.log(err);
    res.json({ message: '잘못된 접근입니다' });
  }
};

module.exports = { addComments, getComments };
