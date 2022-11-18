const mypageDao = require('../models/mypageDAO');

async function getBookRecord(user_id) {
  const result = mypageDao.getBookRecord(user_id);
  return result;
}

module.exports = { getBookRecord };
