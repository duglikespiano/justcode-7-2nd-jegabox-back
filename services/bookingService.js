const bookingDao = require('../models/bookingDAO');

async function getallmovie() {
  const result = await bookingDao.getallmovie();
  result.forEach(unit => {
    if (unit.grade === '12세이상관람가') {
      unit.grade = '12';
    } else if (unit.grade === '15세이상관람가') {
      unit.grade = '15';
    } else if (unit.grade === '청소년관람불가') {
      unit.grade = '18';
    } else if (unit.grade === '전체관람가') {
      unit.grade = 'ALL';
    }
  });
  return result;
}

async function findCinemaByLocation(loc_id) {
  const result = await bookingDao.findCinemaByLocation(loc_id);
  return result;
}

async function findMovieTimeByCinema(date, movie_id, cinema_id) {
  if (movie_id.length === 1) {
    movie_id = `movie_id = ${movie_id[0]}`;
  } else if (movie_id.length === 2) {
    movie_id = `(movie_id = ${movie_id[0]} OR movie_id = ${movie_id[1]})`;
  } else if (movie_id.length === 0) {
    movie_id = `(movie_id > 0)`;
  }

  if (cinema_id.length === 1) {
    cinema_id = `cinema_id = ${cinema_id[0]}`;
  } else if (cinema_id.length === 2) {
    cinema_id = `(cinema_id = ${cinema_id[0]} OR cinema_id = ${cinema_id[1]})`;
  }
  const result = await bookingDao.findMovieTimeByCinema(
    date,
    movie_id,
    cinema_id
  );
  return result;
}

async function findMovieTimeByLocation(date, movie_title, loc_name) {
  const result = await bookingDao.findMovieTimeByLocation(
    date,
    movie_title,
    loc_name
  );
  return result;
}

async function booking(
  user_id,
  showtime_id,
  seat_count_adult,
  seat_count_child,
  seat_name,
  price
) {
  const seat_count = seat_count_adult + seat_count_child;
  await bookingDao.deleteSeat(showtime_id, seat_count, seat_name);

  const movieInfo = await bookingDao.getMovieInfo(showtime_id);
  movieInfo.showtime_day = movieInfo.showtime_day.toISOString().split('T')[0];

  async function createRandNum(min, max) {
    let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  }
  while (1) {
    let TicketNum =
      String(await createRandNum(1000, 9999)) +
      '-' +
      String(await createRandNum(100, 999)) +
      '-' +
      String(await createRandNum(10000, 99999));

    const ExistTicketNum = await bookingDao.ExistTicketNum(TicketNum);

    if (!ExistTicketNum) {
      await bookingDao.insertBookingInfo(
        user_id,
        showtime_id,
        seat_count_adult,
        seat_count_child,
        seat_name,
        movieInfo.ko_title,
        movieInfo.movie_poster,
        movieInfo.movie_property,
        movieInfo.cinema_name,
        movieInfo.screen,
        movieInfo.showtime_day,
        movieInfo.start_time,
        TicketNum,
        price
      );
      break;
    }
  }
}

async function getTimeTable(day, movie_id, loc_id) {
  const result = await bookingDao.getTimeTable(day, movie_id, loc_id);
  return result;
}

async function cancelBook(user_id, TicketNum) {
  const BookRecord = await bookingDao.getBookRecord(TicketNum);
  BookRecord.showtime_day = BookRecord.showtime_day.toISOString().split('T')[0];

  await bookingDao.createCancelRecord(
    user_id,
    BookRecord.ko_title,
    BookRecord.cinema_name,
    BookRecord.showtime_day,
    BookRecord.start_time,
    BookRecord.price
  );

  const seat = await bookingDao.getSeatByTicketNum(TicketNum);
  await bookingDao.addSeat(BookRecord.showtime_id, seat);
  await bookingDao.deleteBookRecord(TicketNum);
}

module.exports = {
  findMovieTimeByCinema,
  findMovieTimeByLocation,
  getallmovie,
  findCinemaByLocation,
  booking,
  getTimeTable,
  cancelBook,
};
