const express = require('express');
const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/likesController');
const { asyncWrap } = require('../utils/myutils.js');

// router.post(
//   '/addLikes',
//   asyncWrap(mw.authMiddleware),
//   asyncWrap(controller.addLikes)
// );
// router.delete(
//   '/removeLikes',
//   asyncWrap(mw.authMiddleware),
//   asyncWrap(controller.removelikes)
// );

router.post('', asyncWrap(mw.authMiddleware), asyncWrap(controller.likes));

module.exports = router;
