const mypageService = require('../services/mypageService');

async function getBookRecord(req, res) {
  const { user_id } = req.userInfo.id;
  const result = mypageService.getBookRecord(user_id);
  res.json(result);
}

module.exports = { getBookRecord };
