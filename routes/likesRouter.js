const express = require('express');
const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/likesController');
const { asyncWrap } = require('../utils/myutils.js');

router.post('', asyncWrap(mw.authMiddleware), asyncWrap(controller.likes));

module.exports = router;
