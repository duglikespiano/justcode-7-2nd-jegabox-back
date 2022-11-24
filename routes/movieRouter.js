const express = require('express');
// const mw = require('../middleware/middleware');
const router = express.Router();
const controller = require('../controllers/movieController');
const { asyncWrap } = require('../utils/myutils.js');

router.get('/main', asyncWrap(controller.getMainMovies));
router.post('/list', asyncWrap(controller.getAllMovies));
router.post('/comingsoon', asyncWrap(controller.getComingsoonMovies));
router.post('/', asyncWrap(controller.searchTitle));
router.get('/', asyncWrap(controller.searchText));
router.get('/detail/:id', asyncWrap(controller.getMovieDetail));

module.exports = router;
