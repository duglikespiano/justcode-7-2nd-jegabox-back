const movieDao = require('../models/movieDao');
const jwt = require('jsonwebtoken');

const getMainMovies = async token => {
  let likecnt;
  let user_id;
  let existLike;
  if (!token) {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }
  const mainMovies = await movieDao.getMainMovies(likecnt);
  if (user_id !== undefined) {
    existLike = await movieDao.existLike(user_id);
  }
  mainMovies.forEach(unit => {
    if (user_id !== undefined) {
      if (existLike && existLike.movie_id.includes(unit.id)) {
        unit.isLiked = true;
      } else {
        unit.isLiked = false;
      }
    } else {
      unit.isLiked = false;
    }
    if (unit.cnt === 'null') {
      unit.cnt = 0;
    }
    unit.cnt = unit.cnt + unit.like;
  });
  return mainMovies;
};

const getAllMovies = async (token, released) => {
  let likecnt;
  let release;
  let user_id;
  if (!token) {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }
  if (released === '전체') {
    release = '';
  } else {
    release = `WHERE DATE_FORMAT(release_date,'%Y-%m-%d') <  DATE_FORMAT('2022-11-16','%Y-%m-%d')`;
  }
  const Allmovies = await movieDao.getAllMovies(likecnt, release);
  if (user_id !== undefined) {
    existLike = await movieDao.existLike(user_id);
  }
  Allmovies.forEach(unit => {
    if (user_id !== undefined) {
      if (existLike && existLike.movie_id.includes(unit.id)) {
        unit.isLiked = true;
      } else {
        unit.isLiked = false;
      }
    } else {
      unit.isLiked = false;
    }
    if (unit.cnt === 'null') {
      unit.cnt = 0;
    }
    unit.cnt = unit.cnt + unit.like;
  });
  return Allmovies;
};

const getComingsoonMovies = async (token, sort) => {
  let likecnt;
  let sorted_by;
  let user_id;
  if (!token) {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }
  if (sort === '개봉일순') {
    sorted_by = `ORDER BY release_date`;
  } else {
    sorted_by = `ORDER BY ko_title`;
  }
  const comingsoonMovie = await movieDao.getComingsoonMovies(
    likecnt,
    sorted_by
  );
  if (user_id !== undefined) {
    existLike = await movieDao.existLike(user_id);
  }
  comingsoonMovie.forEach(unit => {
    if (user_id !== undefined) {
      if (existLike && existLike.movie_id.includes(unit.id)) {
        unit.isLiked = true;
      } else {
        unit.isLiked = false;
      }
    } else {
      unit.isLiked = false;
    }
    if (unit.cnt === 'null') {
      unit.cnt = 0;
    }
    unit.cnt = unit.cnt + unit.like;
  });
  return comingsoonMovie;
};

const searchText = async (token, searchText) => {
  let likecnt;
  let user_id;
  if (!token) {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }
  const result = await movieDao.searchText(likecnt, searchText);
  if (user_id !== undefined) {
    existLike = await movieDao.existLike(user_id);
  }
  result.forEach(unit => {
    if (user_id !== undefined) {
      if (existLike && existLike.movie_id.includes(unit.id)) {
        unit.isLiked = true;
      } else {
        unit.isLiked = false;
      }
    } else {
      unit.isLiked = false;
    }
    if (unit.cnt === 'null') {
      unit.cnt = 0;
    }
    unit.cnt = unit.cnt + unit.like;
  });
  return result;
};

const searchTitle = async (token, searchTitle) => {
  let likecnt;
  let user_id;
  if (!token) {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }
  const result = await movieDao.searchTitle(likecnt, searchTitle);
  if (user_id !== undefined) {
    existLike = await movieDao.existLike(user_id);
  }
  result.forEach(unit => {
    if (user_id !== undefined) {
      if (existLike && existLike.movie_id.includes(unit.id)) {
        unit.isLiked = true;
      } else {
        unit.isLiked = false;
      }
    } else {
      unit.isLiked = false;
    }
    if (unit.cnt === 'null') {
      unit.cnt = 0;
    }
    unit.cnt = unit.cnt + unit.like;
  });
  return result;
};

async function getMovieDetail(token, id) {
  let likecnt;
  let user_id;
  if (token === 'null') {
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = 0 GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  } else {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    user_id = user.id;
    likecnt = `LEFT JOIN (SELECT movie_id, count(*) AS likeCnt FROM jegabox.like WHERE user_id = ${user_id} GROUP BY movie_id) AS lct ON movie.id = lct.movie_id`;
  }

  const result = await movieDao.getMovieDetail(likecnt, id);
  if (user_id !== undefined) {
    const existLike = await movieDao.existLike(user_id);
    if (existLike && existLike.movie_id.includes(result.id)) {
      result.isLiked = true;
    } else {
      result.isLiked = false;
    }
  } else {
    result.isLiked = false;
  }

  if (result.cnt === 'null') {
    result.cnt = 0;
  }
  result.cnt = result.cnt + result.like;
  return result;
}

module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchText,
  searchTitle,
  getMovieDetail,
};
