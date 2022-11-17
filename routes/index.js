const express = require('express');

const userRouter = require('./user');
const movieRouter = require('./movieRouter');
const likesRouter = require('./likesRouter');

// const otherRouter = require('./other');

const router = express.Router();

// router.use(userRouter);
router.use('/movie', movieRouter);
router.use('/likes', likesRouter);

// router.use(otherRouter);

module.exports = router;
