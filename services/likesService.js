const likesDao = require('../models/likesDao');

const addLikes = async (movie_id, id) => {
  await likesDao.addLikes(id, movie_id);
};

const removelikes = async (id, movie_id) => {
  await likesDao.removeLikes(id, movie_id);
};

async function likes(id, movie_id) {
  const existLikes = await likesDao.existLikes(id, movie_id);
  if (existLikes.length === 0) {
    await likesDao.addLikes(id, movie_id);
  } else {
    await likesDao.removeLikes(id, movie_id);
  }
}
module.exports = { addLikes, removelikes, likes };
