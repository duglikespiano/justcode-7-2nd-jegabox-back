const express = require('express');

const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const likesRouter = require('./likesRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/movie', movieRouter);
router.use('/likes', likesRouter);

module.exports = router;
