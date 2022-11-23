const mypageDao = require('../models/mypageDAO');

async function getBookList(user_id) {
  const result = await mypageDao.getBookList(user_id);
  result.forEach(item => {
    item.showtime_day = item.showtime_day.toISOString().split('T')[0];
    item.created_at = item.created_at.toISOString().split('T')[0];
  });
  return result;
}

async function getCancelList(user_id) {
  const result = await mypageDao.getCancelList(user_id);
  result.forEach(item => {
    item.showtime_day = item.showtime_day.toISOString().split('T')[0];
    item.created_at = item.created_at.toISOString().split('T')[0];
  });
  return result;
}

async function getHeaderInfo(user_id) {
  const ExistBookingRecord = await mypageDao.ExistBookingRecord(user_id);
  if (ExistBookingRecord.length !== 0) {
    const result = await mypageDao.getHeaderInfoWithBook(user_id);
    return result;
  } else {
    const rtn = await mypageDao.getHearderInfoWithoutBook(user_id);
    console.log(rtn);
    return rtn;
  }
}

module.exports = { getBookList, getCancelList, getHeaderInfo };
