const likesService = require('../services/likesService');

const addLikes = async (req, res) => {
  try {
    const { movie_id } = req.body;
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

    await likesService.addLikes(movie_id, id);
    res.status(200).json({ message: 'success movie like' });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
};

const removelikes = async (req, res) => {
  try {
    const { movie_id } = req.body;
    const { token } = req.headers;

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

    await likesService.removelikes(movie_id, token);

    res.status(200).json({ message: 'success delete' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addLikes, removelikes };
