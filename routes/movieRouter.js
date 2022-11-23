const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');
const { asyncWrap } = require('../utils/myutils');

router.get('/main', controller.getMainMovies);
router.get('/list', controller.getAllMovies);
router.get('/comingsoon', controller.getComingsoonMovies);
router.get('/', asyncWrap(controller.getMovieByTitle));

module.exports = router;
