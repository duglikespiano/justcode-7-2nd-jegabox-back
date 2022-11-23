const movieService = require('../services/movieService');

const getMainMovies = async (req, res) => {
  const mainMovies = await movieService.getMainMovies();
  res.status(200).json({ data: mainMovies });
};

const getAllMovies = async (req, res) => {
  try {
    const { released } = req.body;
    if (released !== '전체' || '개봉작만') {
      const error = new Error('put Unknown information');
      error.status = 400;
    }
    const AllMovie = await movieService.getAllMovies(released);
    res.status(200).json({ data: AllMovie });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const getComingsoonMovies = async (req, res) => {
  try {
    const { sort } = req.body;
    if (sort !== '가나다순' || '개봉일순') {
      const error = new Error('put Unknown information');
      error.status = 400;
    }
    const comingsoonMovie = await movieService.getComingsoonMovies(sort);
    res.status(200).json({ data: comingsoonMovie });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
};

async function getMovieByTitle(req, res) {
  const searchText = req.query.searchText;
  const result = await movieService.getMovieByTitle(searchText);

  res.json(result);
}

async function getMovieBySearch(req, res) {
  const searchTitle = req.body;
  const result = await movieService.getMovieByTitle(searchTitle);
  res.json(result);
}

module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  getMovieByTitle,
  getMovieBySearch,
};
