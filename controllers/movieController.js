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

const searchText = async (req, res) => {
  const { searchText } = req.query;
  const result = await movieService.searchText(searchText);
  res.status(200).json({ data: result });
};
const searchTitle = async (req, res) => {
  const { searchText } = req.body;
  const result = await movieService.searchText(searchText);
  res.status(200).json({ data: result });
};
module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchText,
  searchTitle,
};
