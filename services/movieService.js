const movieDao = require('../models/movieDao');

const getMainMovies = async () => {
  const mainPagenation = 'LIMIT 4';
  const mainMovies = await movieDao.getMainMovies(mainPagenation);
  return mainMovies;
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
