const database = require('./database');

async function getBookRecord(user_id) {
  const rtn = await database.query(`
    SELECT
        *
    FROM
        booking
    WHERE user_id = '${user_id}'
  `);
  return rtn;
}

module.exports = { getBookRecord };
