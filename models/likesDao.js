const database = require('./database');

const addLikes = async (id, movie_id) => {
  await database.query(`
    INSERT INTO
      jegabox.like (user_id, movie_id)
    VALUES
      (${id}, ${movie_id})
  `);
};

const removeLikes = async (user_id, movie_id) => {
  await database.query(`
  DELETE FROM
    jegabox.like
  WHERE
    user_id = ${user_id} AND movie_id = ${movie_id}
  `);
};

async function existLikes(id, movie_id) {
  const rtn = await database.query(`
    SELECT
      *
    FROM
      jegabox.like
    WHERE
      user_id = ${id} AND movie_id = ${movie_id}
  `);
  return rtn;
}

module.exports = { addLikes, removeLikes, existLikes };
