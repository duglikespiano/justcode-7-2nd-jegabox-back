const bookingService = require('../services/bookingService');

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
  let { date, movie_id, cinema_id } = req.body;
  const result = await bookingService.findMovieTimeByCinema(
    date,
    movie_id,
    cinema_id
  );
  res.json(result);
}

async function findMovieTimeByLocation(req, res) {
  const { date, movie_title, loc_name } = req.body;
  const result = await bookingService.findMovieTimeByLocation(
    date,
    movie_title,
    loc_name
  );
  console.log(result);
  res.json(result);
}

async function booking(req, res) {
  const user_id = req.userInfo.id;
  let { showtime_id, seat_count_adult, seat_count_child, seat_name, price } =
    req.body;
  if (seat_count_adult === undefined) {
    seat_count_adult = 0;
  }
  if (seat_count_child === undefined) {
    seat_count_child = 0;
  }
  await bookingService.booking(
    user_id,
    showtime_id,
    seat_count_adult,
    seat_count_child,
    seat_name,
    price
  );
  res.json({ message: '예매완료' });
}

async function cancelBook(req, res) {
  const user_id = req.userInfo.id;
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
  findMovieTimeByCinema,
  getallmovie,
  findCinemaByLocation,
  findMovieTimeByLocation,
  booking,
  getTimeTable,
  cancelBook,
};
