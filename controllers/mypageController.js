const mypageService = require('../services/mypageService');

async function getBookList(req, res) {
  const user_id = req.userInfo.id;
  const result = await mypageService.getBookList(user_id);
  res.json(result);
}

async function getCancelList(req, res) {
  const user_id = req.userInfo.id;
  const result = await mypageService.getCancelList(user_id);
  res.json(result);
}

async function getHeaderInfo(req, res) {
  const user_id = req.userInfo.id;
  const result = await mypageService.getHeaderInfo(user_id);
  res.json(result);
}

async function getLikeMovie(req, res) {
  const user_id = req.userInfo.id;
  const result = await mypageService.getLikeMovie(user_id);
  res.json(result);
}

module.exports = { getBookList, getCancelList, getHeaderInfo, getLikeMovie };
