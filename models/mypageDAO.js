const database = require('./database');

async function getBookList(user_id) {
  const rtn = await database.query(`
    SELECT
	    ticket_number,
      ko_title,
      movie_property,
      movie_poster,
      cinema_name,
      screen,
      seat_count_adult,
      seat_count_child,
      GROUP_CONCAT(booking.seat_name) as seat_name,
      showtime_day,
      start_time,
      created_at
    FROM
	    booking
    WHERE
      user_id = ${user_id}
    GROUP BY
	    ticket_number,
      ko_title, movie_property,
      movie_poster, cinema_name,
      screen, seat_count_adult,
      seat_count_child,
      showtime_day,
      start_time,
      created_at;
  `);
  return rtn;
}

async function getCancelList(user_id) {
  const rtn = await database.query(`
    SELECT
      *
    FROM
      canceled_booking
    WHERE
      canceled_booking.user_id = ${user_id}
  `);
  return rtn;
}

async function ExistBookingRecord(user_id) {
  const result = await database.query(`
    SELECT
      *
    FROM
      booking
    WHERE
      user_id = ${user_id}
  `);
  return result;
}

async function getHeaderInfoWithBook(user_id) {
  const [result] = await database.query(`
    SELECT DISTINCT
      user.name,
      booking.ko_title,
      booking.created_at
    FROM
      user
    JOIN booking ON booking.user_id = user.id
    WHERE
      user.id = ${user_id}
    ORDER BY created_at desc
  `);
  return result;
}

async function getHearderInfoWithoutBook(user_id) {
  const [rtn] = await database.query(`
    SELECT
      user.name
    FROM
      user
    WHERE
      user.id = ${user_id}
  `);
  return rtn;
}

async function getLikeMovie(user_id) {
  const rtn = await database.query(`
    SELECT
	    movie.ko_title,
      movie.movie_poster,
      movie.director,
      movie.genre,
      movie.movie_time,
      jegabox.like.created_at
    FROM
	    jegabox.like
    JOIN movie ON jegabox.like.movie_id = movie.id
    WHERE
      jegabox.like.user_id = ${user_id}
  `);
  return rtn;
}

module.exports = {
  getBookList,
  getCancelList,
  getHeaderInfoWithBook,
  ExistBookingRecord,
  getHearderInfoWithoutBook,
  getLikeMovie,
};
