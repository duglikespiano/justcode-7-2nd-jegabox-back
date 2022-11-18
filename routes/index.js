const express = require('express');

const userRouter = require('./user');
const movieRouter = require('./movieRouter');
// const otherRouter = require('./other');

const router = express.Router();

// router.use(userRouter);
router.use('/movie', movieRouter);
// router.use(otherRouter);

module.exports = router;
