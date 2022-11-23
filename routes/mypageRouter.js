const express = require('express');
const mw = require('../middleware/middleware');
const { asyncWrap } = require('../utils/myutils');
const mypageController = require('../controllers/mypageController');

const router = express.Router();

router.get(
  '/bookinglist',
  asyncWrap(mw.authMiddleware),
  asyncWrap(mypageController.getBookList)
);
router.get(
  '/cancellist',
  asyncWrap(mw.authMiddleware),
  asyncWrap(mypageController.getCancelList)
);

router.get(
  '/header',
  asyncWrap(mw.authMiddleware),
  asyncWrap(mypageController.getHeaderInfo)
);

module.exports = router;
