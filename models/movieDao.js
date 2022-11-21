const database = require('./database');

// select movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type from movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id
// select movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.viewer, lt.cnt, mtt.type from movie LEFT JOIN (select movie_id, count(*) AS cnt FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id LEFT JOIN (select movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type from movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id) AS mtt on movie.id = mtt.movie_id order by viewer;

const getMainMovies = async pagenation => {
  const getMainMovies = await database.query(`
    SELECT movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.grade, movie.viewer, lt.cnt, mtt.type 
    FROM movie 
    LEFT JOIN (SELECT movie_id, count(*) AS cnt FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id 
    LEFT JOIN (SELECT movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type FROM movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id 
    ORDER BY viewer DESC
    ${pagenation}
    `);
  return getMainMovies;
};

// const getAllMovies = async release => {
//   const getAllMovies = await database.query(`
// SELECT
// movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.viewer, movie.release_date, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
// FROM movie
// LEFT JOIN movie_type ON movie.id = movie_type.movie_id
// LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
// GROUP BY movie.id
// ORDER BY viewer
// ${release}
// `);
//   return getAllMovies;
// };

const getAllMovies = async release => {
  const getAllMovies = await database
    .query(
      `
  SELECT movie.id, movie.ko_title, movie.movie_poster, movie.like, movie.description, movie.grade, movie.viewer, movie.release_date, lt.cnt, mtt.type
  FROM movie
  LEFT JOIN (SELECT movie_id, count(*) AS cnt FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
  LEFT JOIN (SELECT movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type FROM movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
  ${release}
  ORDER BY viewer DESC
`
    )
    .then(answer => {
      return answer.map(item => {
        return { ...item, cnt: Number(item.cnt) };
      });
    });
  return getAllMovies;
};

// const getComingsoonMovies = async sorted_by => {
//   const comingsoonMovie = await database.query(`
// SELECT
// movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.viewer, movie.release_date, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
// FROM movie
// LEFT JOIN movie_type ON movie.id = movie_type.movie_id
// LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
// WHERE DATE_FORMAT(release_date,'%Y-%m-%d') >  DATE_FORMAT('2022-11-16','%Y-%m-%d')
// GROUP BY movie.id
// ${sorted_by}
// `);
//   return comingsoonMovie;
// };

const getComingsoonMovies = async sorted_by => {
  const comingsoonMovie = await database.query(`
  SELECT movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.grade, movie.like, movie.viewer as viewer, movie.release_date, lt.cnt as cnt, mtt.type
  FROM movie
  LEFT JOIN (SELECT movie_id, count(*) AS cnt FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
  LEFT JOIN (SELECT movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type FROM movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
  WHERE DATE_FORMAT(release_date,'%Y-%m-%d') >  DATE_FORMAT('2022-11-16','%Y-%m-%d')
  ${sorted_by}
`);
  return comingsoonMovie;
};

const searchText = async searchText => {
  const result = await database.query(`
    SELECT movie.id, movie.ko_title, movie.movie_poster, movie.description, movie.grade, movie.viewer, lt.cnt, mtt.type 
    FROM movie 
    LEFT JOIN (SELECT movie_id, count(*) AS cnt FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id 
    LEFT JOIN (SELECT movie_type.movie_id, JSON_ARRAYAGG(movie_type_properties.movie_type) AS type FROM movie_type LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id 
    WHERE  movie.ko_title like '%${searchText}%'
        `);
  return result;
};
module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchText,
};
