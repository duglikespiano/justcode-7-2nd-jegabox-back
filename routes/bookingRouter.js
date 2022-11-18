const express = require('express');
const {
  getallcinema,
  findMovieTimeByCinema,
  findMovieTimeByLocation,
  getallmovie,
  findCinemaByLocation,
  booking,
  getTimeTable,
  cancelBook,
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/test', getallcinema);
router.get('/', getallmovie);
router.post('/movie-cinema', findMovieTimeByCinema);
router.post('/movie-location', findMovieTimeByLocation);
router.post('/cinema', findCinemaByLocation);
router.post('/booking', booking);
router.post('/timetable', getTimeTable);
router.post('/cancel', cancelBook);

module.exports = router;
