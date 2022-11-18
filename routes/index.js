const express = require('express');

const user = require('./user');
const bookingRoute = require('./bookingRouter');
const mypageRouter = require('./mypageRouter');
// const otherRouter = require('./other');

const router = express.Router();

router.use(user);
router.use('/booking', bookingRoute);
router.use('/mypage', mypageRouter);
// router.use(otherRouter);

module.exports = router;
