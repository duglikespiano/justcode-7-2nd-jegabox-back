const express = require('express');
const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/commentsController.js');
const { asyncWrap } = require('../utils/myutils.js');

router.post(
  '/addComment',
  asyncWrap(mw.authMiddleware),
  asyncWrap(controller.addComments)
);
router.get('/', asyncWrap(controller.getComments));

module.exports = router;
