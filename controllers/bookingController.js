const bookingService = require('../services/bookingService');

async function getallcinema(req, res) {
  const result = await bookingService.getAllCinema();
  console.log(result);
  res.json(result);
}

async function getallmovie(req, res) {
  const result = await bookingService.getallmovie();
  console.log(result);
  res.json({ data: result });
}

async function findCinemaByLocation(req, res) {
  const { loc_id } = req.body;
  const result = await bookingService.findCinemaByLocation(loc_id);
  console.log(result);
  res.json(result);
}

async function findMovieTimeByCinema(req, res) {
  try {
    const { date, movie_id, cinema_id } = req.body;
    const result = await bookingService.findMovieTimeByCinema(
      date,
      movie_id,
      cinema_id
    );
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
}

async function findMovieTimeByLocation(req, res) {
  try {
    const { date, movie_title, loc_name } = req.body;
    const result = await bookingService.findMovieTimeByLocation(
      date,
      movie_title,
      loc_name
    );
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
}

async function booking(req, res) {
  try {
    const { showtime_id, seat_count, seat_name } = req.body;
    await bookingService.booking(showtime_id, seat_count, seat_name);
    res.json({ message: '예매완료' });
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
}

async function cancelBook(req, res) {
  const { user_id } = req.body;
  const { TicketNum } = req.body;
  await bookingService.cancelBook(user_id, TicketNum);
  res.json({ message: '예매가 취소되었습니다.' });
}

async function getTimeTable(req, res) {
  const { day, movie_id, loc_id } = req.body;
  const result = await bookingService.getTimeTable(day, movie_id, loc_id);
  console.log(result);
  res.json(result);
}

module.exports = {
  getallcinema,
  findMovieTimeByCinema,
  getallmovie,
  findCinemaByLocation,
  findMovieTimeByLocation,
  booking,
  getTimeTable,
  cancelBook,
};
