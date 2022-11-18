const myDataSource = require('./database');

const addLikes = async (user_id, movie_id) => {
  await myDataSource.query(`
    INSERT INTO jegabox.like (user_id, movie_id)
    VALUES ("${user_id}", "${movie_id}")
  `);
};

const removelikes = async (user_id, movie_id) => {
  await myDataSource.query(`
  DELETE FROM jegabox.like
  WHERE user_id = ${user_id} && movie_id = ${movie_id}
  `);
};

module.exports = { addLikes, removelikes };

// 마이페이지 구현하면 get likes 만들 예정
