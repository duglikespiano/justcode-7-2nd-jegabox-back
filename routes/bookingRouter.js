const express = require('express');
const mw = require('../middleware/middleware');
const { asyncWrap } = require('../utils/myutils.js');

const {
  findMovieTimeByCinema,
  findMovieTimeByLocation,
  getallmovie,
  findCinemaByLocation,
  booking,
  getTimeTable,
  cancelBook,
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/', asyncWrap(getallmovie));
router.post('/movie-cinema', asyncWrap(findMovieTimeByCinema));
router.post('/movie-location', asyncWrap(findMovieTimeByLocation));
router.post('/cinema', asyncWrap(findCinemaByLocation));
router.post('/booking', asyncWrap(mw.authMiddleware), asyncWrap(booking));
router.post('/timetable', asyncWrap(getTimeTable));
router.post('/cancel', asyncWrap(mw.authMiddleware), asyncWrap(cancelBook));

module.exports = router;
