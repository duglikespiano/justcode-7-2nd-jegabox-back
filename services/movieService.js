const movieDao = require('../models/movieDao');
const jwt = require('jsonwebtoken');

const getMainMovies = async token => {
  if (!token) {
    const likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
    const mainMovies = await movieDao.getMainMovies(likecnt);
    mainMovies.forEach(unit => {
      if (unit.likeCnt === null) {
        unit.likeCnt = 0;
      }
    });
    return mainMovies;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = user.id;
    const likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
    const mainMovies = await movieDao.getMainMovies(likecnt);
    mainMovies.forEach(unit => {
      if (unit.likeCnt === null) {
        unit.likeCnt = 0;
      }
    });
    return mainMovies;
  }
};

const getAllMovies = async released => {
  if (released === '전체') {
    const release = '';
    const Allmovies = await movieDao.getAllMovies(release);

    Allmovies.forEach(item => {
      if (item.cnt === 'null') {
        item.cnt = 0;
      }
      item.cnt = item.cnt + item.like;
    });

    return Allmovies;
  }
  const release = `WHERE DATE_FORMAT(release_date,'%Y-%m-%d') <  DATE_FORMAT('2022-11-16','%Y-%m-%d')`;
  const Allmovies = await movieDao.getAllMovies(release);

  return Allmovies;
};

const getComingsoonMovies = async sort => {
  if (sort === '개봉일순') {
    const sorted_by = `ORDER BY release_date`;
    const comingsoonMovie = await movieDao.getComingsoonMovies(sorted_by);

    comingsoonMovie.forEach(item => {
      if (item.cnt === 'null') {
        item.cnt = 0;
      }
      item.cnt = item.cnt + item.like;
    });

    return comingsoonMovie;
  }
  const sorted_by = `ORDER BY ko_title`;
  const comingsoonMovie = await movieDao.getComingsoonMovies(sorted_by);

  comingsoonMovie.forEach(item => {
    if (item.cnt === 'null') {
      item.cnt = 0;
    }
    item.cnt = item.cnt + item.like;
  });

  return comingsoonMovie;
};

const searchText = async searchText => {
  const result = await movieDao.searchText(searchText);
  return result;
};

module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchText,
};
