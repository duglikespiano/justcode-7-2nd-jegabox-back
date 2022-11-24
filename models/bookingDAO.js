const database = require('./database');

async function getallmovie() {
  const rtn = await database.query(`
    SELECT
      movie.id,
      movie.ko_title,
      movie.movie_poster,
      movie.grade
    FROM
      movie;
  `);
  return rtn;
}

async function findCinemaByLocation(loc_id) {
  const rtn = await database.query(`
    SELECT
      *
    FROM
      cinema
    WHERE
      location_id = ${loc_id}
  `);
  return rtn;
}

async function findMovieTimeByCinema( date, movie_id, cinema_id) {
  const rtn = await database.query(`
    SELECT
      showtime.id,
      location.location_name,
      cinema.cinema_name,
      movie.ko_title as title,
      movie.movie_poster as Img_url,
      movie.movie_time,
      movie.grade,
      showtime.screen,
      showtime.movie_property,
      GROUP_CONCAT(JSON_OBJECT('day', DAY, 'time', showtime.start_time, 'seats', SEAT)) as seats
    FROM movie_cinema
    JOIN movie ON movie.id = movie_cinema.movie_id
    JOIN cinema ON cinema.id = movie_cinema.cinema_id
    JOIN location ON cinema.location_id = location.id
    JOIN showtime ON showtime.movie_cinema_id = movie_cinema.id
    JOIN 
      (SELECT
        showtime_seat.showtime_id as time_id,
        showtime.showtime_day as DAY,
        JSON_ARRAYAGG(showtime_seat.seat_name) as SEAT
      FROM showtime_seat
      JOIN showtime ON showtime.id = showtime_seat.showtime_id
      GROUP BY showtime_seat.showtime_id, showtime.showtime_day) as seat_sub ON showtime.id = seat_sub.time_id
    WHERE DAY = '${date}' AND
    ${movie_id} AND ${cinema_id}
    GROUP BY movie_cinema.id, showtime.id
    ORDER BY showtime.start_time
  `)
  .then((answer) => {
    return [...answer].map((item) => {
      return {...item, seats: JSON.parse(item.seats)}
    })
  });
  return rtn;
}

async function findMovieTimeByLocation ( date, movie_title, loc_name ) {
  const rtn = await database.query(`
    SELECT
      showtime.id,
      location.location_name,
      cinema.cinema_name,
      movie.ko_title as title,
      movie.movie_poster as Img_url,
      movie.movie_time,
      movie.grade,
      showtime.screen,
      showtime.movie_property,
      GROUP_CONCAT(JSON_OBJECT('day', DAY, 'time', showtime.start_time, 'seats', SEAT)) as seats
    FROM movie_cinema
    JOIN movie ON movie.id = movie_cinema.movie_id
    JOIN cinema ON cinema.id = movie_cinema.cinema_id
    JOIN location ON cinema.location_id = location.id
    JOIN showtime ON showtime.movie_cinema_id = movie_cinema.id
    JOIN 
      (SELECT
        showtime_seat.showtime_id as time_id,
        showtime.showtime_day as DAY,
        JSON_ARRAYAGG(showtime_seat.seat_name) as SEAT
      FROM showtime_seat
      JOIN showtime ON showtime.id = showtime_seat.showtime_id
      GROUP BY showtime_seat.showtime_id, showtime.showtime_day) as seat_sub ON showtime.id = seat_sub.time_id
      WHERE DAY = '${date}' AND movie.ko_title = '${movie_title}' AND location.location_name = '${loc_name}'
    GROUP BY movie_cinema.id, showtime.id
  `)
  .then((answer) => {
    return [...answer].map((item) => {
      return {...item, seats: JSON.parse(item.seats)}
    })
  });
  return rtn;
}

async function deleteSeat(showtime_id, seat_count, seat_name) {
  for (let i = 0 ; i < seat_count ; i++){
    let seat = seat_name[i];
    await database.query(`
      DELETE
        FROM showtime_seat
      WHERE
        showtime_id = ${showtime_id} AND seat_name = '${seat}'
    `)
  }
}

async function getMovieInfo(showtime_id) {
  const [rtn] = await database.query(`
    SELECT
	    movie.ko_title,
	    movie.movie_poster,
	    showtime.movie_property,
	    cinema.cinema_name,
      showtime.screen,
      showtime.showtime_day,
      showtime.start_time
    FROM showtime
    JOIN movie_cinema ON movie_cinema.id = showtime.movie_cinema_id
    JOIN movie ON movie.id = movie_cinema.movie_id
    JOIN cinema ON cinema.id = movie_cinema.cinema_id
    WHERE showtime.id = ${showtime_id};
  `);
  return rtn;
}

async function ExistTicketNum(TicketNum) {
  const [rtn] = await database.query(`
    SELECT
      *
    FROM booking
    WHERE ticket_number = '${TicketNum}';
  `)
  return rtn;
}

async function insertBookingInfo(user_id, showtime_id, seat_count_adult, seat_count_child, seat_name, ko_title, movie_poster, movie_property, cinema_name, screen, showtime_day, start_time, ticket_number, price) {
  for ( let i = 0 ; i < seat_name.length ; i++){
    let seat = seat_name[i]
    await database.query(`
      INSERT INTO
        booking (user_id, showtime_id, seat_count_adult, seat_count_child, seat_name, ko_title, movie_poster, movie_property, cinema_name, screen, showtime_day, start_time, ticket_number, price)
      VALUES
        (${user_id}, ${showtime_id}, ${seat_count_adult}, ${seat_count_child}, '${seat}', '${ko_title}', '${movie_poster}', '${movie_property}', '${cinema_name}', '${screen}', '${showtime_day}', '${start_time}', '${ticket_number}', ${price});
    `)
  }
}

async function getTimeTable(day, movie_id, loc_id) {
  const rtn = await database.query(`
    SELECT
      showtime.id,
      location.location_name,
      cinema.cinema_name,
      movie.ko_title as title,
      movie.movie_poster as Img_url,
      movie.grade,
      showtime.screen,
      showtime.movie_property,
      GROUP_CONCAT(JSON_OBJECT('day', DAY, 'time', showtime.start_time, 'seats', SEAT)) as seats
    FROM movie_cinema
    JOIN movie ON movie.id = movie_cinema.movie_id
    JOIN cinema ON cinema.id = movie_cinema.cinema_id
    JOIN location ON cinema.location_id = location.id
    JOIN showtime ON showtime.movie_cinema_id = movie_cinema.id
    JOIN 
      (SELECT
        showtime_seat.showtime_id as time_id,
        showtime.showtime_day as DAY,
        JSON_ARRAYAGG(showtime_seat.seat_name) as SEAT
      FROM showtime_seat
      JOIN showtime ON showtime.id = showtime_seat.showtime_id
      GROUP BY showtime_seat.showtime_id, showtime.showtime_day) as seat_sub ON showtime.id = seat_sub.time_id
    WHERE DAY = '${day}' AND movie_id = ${movie_id} AND location.id = ${loc_id}
    GROUP BY movie_cinema.id, showtime.id
  `)
  .then((answer) => {
    return [...answer].map((item) => {
      return {...item, seats: JSON.parse(item.seats)}
    })
  });
  return rtn;
}

async function getBookRecord(TicketNum) {
  const [rtn] = await database.query(`
    SELECT
      *
    FROM
      booking
    WHERE ticket_number = '${TicketNum}'
  `);
  return rtn;
}

async function createCancelRecord(user_id, ko_title, cinema_name, showtime_day, start_time, price) {
  await database.query(`
    INSERT INTO
      canceled_booking (user_id, movie_title, cinema_name, showtime_day, start_time, price)
    VALUES
      (${user_id}, '${ko_title}', '${cinema_name}', '${showtime_day}', '${start_time}', ${price})
  `);
}

async function getSeatByTicketNum(TicketNum) {
  const rtn = await database.query(`
    SELECT
      seat_name
    FROM
      booking
    WHERE
      ticket_number = '${TicketNum}'
  `);
  return rtn;
}

async function addSeat(showtime_id, seat) {
  for(let i = 0 ; i < seat.length ; i++) {
    let seat_unit = seat[i].seat_name;
    await database.query(`
      INSERT INTO
        showtime_seat (showtime_id, seat_name)
      VALUES
        (${showtime_id}, '${seat_unit}')
    `);
  }
}

async function deleteBookRecord(TicketNum) {
  await database.query(`
    DELETE
      FROM booking
    WHERE
      ticket_number = '${TicketNum}'
  `);
}

module.exports = {

  findMovieTimeByCinema,
  getallmovie,
  findCinemaByLocation,
  findMovieTimeByLocation,
  deleteSeat,
  getTimeTable,
  getMovieInfo,
  insertBookingInfo,
  ExistTicketNum,
  getBookRecord,
  createCancelRecord,
  getSeatByTicketNum,
  addSeat,
  deleteBookRecord,
};
