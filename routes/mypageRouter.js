const express = require('express');
const { getBookRecord } = require('../controllers/mypageController');

const router = express.Router();

router.get('/bookinglist', getBookRecord);

module.exports = router;
