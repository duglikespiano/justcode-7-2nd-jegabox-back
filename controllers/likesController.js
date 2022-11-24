const likesService = require('../services/likesService');

const addLikes = async (req, res) => {
  const { movie_id } = req.body;
  const id = req.userInfo.id;

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
};

const removelikes = async (req, res) => {
  const { movie_id } = req.body;
  const id = req.userInfo.id;

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

  await likesService.removelikes(id, movie_id);

  res.status(200).json({ message: 'success delete' });
};

async function likes(req, res) {
  const id = req.userInfo.id;
  const { movie_id } = req.body;
  await likesService.likes(id, movie_id);
  res.json({ message: '얍' });
}

module.exports = { addLikes, removelikes, likes };
