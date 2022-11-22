const movieService = require('../services/movieService');

const getMainMovies = async (req, res) => {
  const token = req.headers.authorization;
  const mainMovies = await movieService.getMainMovies(token);
  res.status(200).json({ data: mainMovies });
};

const getAllMovies = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { released } = req.body;
    if (released !== '전체' || '개봉작만') {
      const error = new Error('put Unknown information');
      error.status = 400;
    }
    const AllMovie = await movieService.getAllMovies(token, released);
    res.status(200).json({ data: AllMovie });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const getComingsoonMovies = async (req, res) => {
  try {
    const { sort } = req.body;
    const token = req.headers.authorization;

    if (sort !== '가나다순' || '개봉일순') {
      const error = new Error('put Unknown information');
      error.status = 400;
    }
    const comingsoonMovie = await movieService.getComingsoonMovies(token, sort);
    res.status(200).json({ data: comingsoonMovie });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ message: error.message });
  }
};

const searchTitle = async (req, res) => {
  const { searchTitle } = req.body;
  const token = req.headers.authorization;

  const result = await movieService.searchTitle(token, searchTitle);
  res.status(200).json({ data: result });
};

const searchText = async (req, res) => {
  const { searchText } = req.query;
  const token = req.headers.authorization;

  const result = await movieService.searchText(token, searchText);
  res.status(200).json({ data: result });
};

module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchTitle,
  searchText,
};
