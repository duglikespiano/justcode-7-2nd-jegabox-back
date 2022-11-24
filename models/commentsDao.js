const database = require('./database');

const addComments = async (id, movie_id, rate, comment) => {
  await database.query(`
    INSERT INTO 
      comment (user_id, movie_id, comment, rating)
    VALUES
      (${id}, ${movie_id}, '${comment}',  '${rate}')
  `);
};

const getComments = async pstMovieNo => {
  const [check] = await database.query(`SELECT max(id) AS maxid FROM movie`);
  if (check.maxid > pstMovieNo) {
    const result = await database.query(`
    SELECT
      user.account_id,
      comment.movie_id,
      comment.comment,
      comment.rating,
      comment.created_at
    FROM
      comment 
    JOIN user ON user.id = comment.user_id
    WHERE
      movie_id = ${pstMovieNo}
    `);
    return result;
  } else {
    throw err;
  }
};

module.exports = { addComments, getComments };
