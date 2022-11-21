const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');

router.get('/main', controller.getMainMovies);
router.get('/list', controller.getAllMovies);
router.get('/comingsoon', controller.getComingsoonMovies);
router.get('/', controller.searchText);
router.post('/comingsoon', controller.getComingsoonMovies);

module.exports = router;
