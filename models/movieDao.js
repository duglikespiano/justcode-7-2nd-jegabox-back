const database = require('./database');

const getMainMovies = async likecnt => {
  const getMainMovies = await database
    .query(
      `
      SELECT
        movie.id,
        movie.ko_title,
        movie.en_title,
        movie.description,
        movie.sub_description,
        movie.movie_poster,
        movie.movie_time,
        movie.director,
        movie.actors,
        movie.genre,
        movie.grade,
        movie.grade_simple,
        movie.viewer,
        movie.like,
        DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
        lt.cnt,
        mtt.type,
        avgt.rated,
        lct.likeCnt as isLiked
      FROM
        movie
      ${likecnt}
      LEFT JOIN
        (SELECT
          movie_id,
          ROUND(avg(rating),1) AS rated
        FROM
          comment
        GROUP BY movie_id ) AS avgt ON movie.id = avgt.movie_id
      LEFT JOIN
        (SELECT
          movie_id,
          count(*) AS cnt
        FROM
          jegabox.like
        GROUP BY movie_id) AS lt ON movie.id = lt.movie_id 
      LEFT JOIN
        (SELECT
          movie_type.movie_id,
          JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
        FROM movie_type
        LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
        GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id 
      ORDER BY id
      LIMIT 5
    `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: unit.type };
        // return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return getMainMovies;
};

const getAllMovies = async (likecnt, release) => {
  const getAllMovies = await database
    .query(
      `
    SELECT
      movie.id,
      movie.ko_title,
      movie.en_title,
      movie.description,
      movie.sub_description,
      movie.movie_poster,
      movie.movie_time,
      movie.director,
      movie.actors,
      movie.genre,
      movie.grade,
      movie.grade_simple,
      movie.viewer,
      movie.like,
      DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
      lt.cnt,
      mtt.type,
      avgt.rated,
      lct.likeCnt as isLiked
    FROM movie
    ${likecnt}
    LEFT JOIN
      (SELECT
        movie_id,
        ROUND(avg(rating),1) AS rated
      FROM
        comment
      GROUP BY movie_id ) AS avgt ON movie.id = avgt.movie_id
    LEFT JOIN
      (SELECT
        movie_id,
        count(*) AS cnt
        FROM jegabox.like GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
    LEFT JOIN
      (SELECT
        movie_type.movie_id,
        JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
      FROM
        movie_type
      LEFT JOIN
        movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
      GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
    ${release}
    `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return getAllMovies;
};

const getComingsoonMovies = async (likecnt, sorted_by) => {
  const comingsoonMovie = await database
    .query(
      `
    SELECT
      movie.id,
      movie.ko_title,
      movie.en_title,
      movie.description,
      movie.sub_description,
      movie.movie_poster,
      movie.movie_time,
      movie.director,
      movie.actors,
      movie.genre,
      movie.grade,
      movie.grade_simple,
      movie.viewer,
      movie.like,
      DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
      lt.cnt,
      mtt.type,
      avgt.rated,
      lct.likeCnt as isLiked
    FROM
      movie
    ${likecnt}
    LEFT JOIN
      (SELECT
        movie_id,
        ROUND(avg(rating),1) AS rated
      FROM
        comment
      GROUP BY movie_id) AS avgt ON movie.id = avgt.movie_id
    LEFT JOIN
      (SELECT
        movie_id,
        count(*) AS cnt
      FROM
        jegabox.like
      GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
    LEFT JOIN
      (SELECT
        movie_type.movie_id,
        JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
      FROM
        movie_type
      LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
      GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
    WHERE
      DATE_FORMAT(release_date,'%Y-%m-%d') >  DATE_FORMAT('2022-11-16','%Y-%m-%d')
    ${sorted_by}
    `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return comingsoonMovie;
};

const searchText = async (likecnt, searchText) => {
  const result = await database
    .query(
      `
    SELECT
      movie.id,
      movie.ko_title,
      movie.en_title,
      movie.description,
      movie.sub_description,
      movie.movie_poster,
      movie.movie_time,
      movie.director,
      movie.actors,
      movie.genre,
      movie.grade,
      movie.grade_simple,
      movie.viewer,
      movie.like,
      DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
      lt.cnt,
      mtt.type,
      avgt.rated,
      lct.likeCnt as isLiked
    FROM
      movie
    ${likecnt}
    LEFT JOIN
      (SELECT
        movie_id,
        ROUND(avg(rating),1) AS rated
      FROM
        comment
      GROUP BY movie_id ) AS avgt ON movie.id = avgt.movie_id
    LEFT JOIN
      (SELECT
        movie_id,
        count(*) AS cnt
      FROM
        jegabox.like
      GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
    LEFT JOIN
      (SELECT
        movie_type.movie_id,
        JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
      FROM
        movie_type
      LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
      GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
    WHERE
      movie.ko_title like '%${searchText}%'
  `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return result;
};

const searchTitle = async (likecnt, searchTitle) => {
  const result = await database
    .query(
      `
    SELECT
      movie.id,
      movie.ko_title,
      movie.en_title,
      movie.description,
      movie.sub_description,
      movie.movie_poster,
      movie.movie_time,
      movie.director,
      movie.actors,
      movie.genre,
      movie.grade,
      movie.grade_simple,
      movie.viewer,
      movie.like,
      DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
      movie.like,
      lt.cnt,
      mtt.type,
      avgt.rated,
      lct.likeCnt as isLiked
    FROM
      movie
    ${likecnt}
    LEFT JOIN
      (SELECT
        movie_id,
        ROUND(avg(rating),1) AS rated
      FROM
        comment
      GROUP BY movie_id ) AS avgt ON movie.id = avgt.movie_id
    LEFT JOIN
      (SELECT
        movie_id,
        count(*) AS cnt FROM jegabox.like
      GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
    LEFT JOIN
      (SELECT
        movie_type.movie_id,
        JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
      FROM
        movie_type
      LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
      GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
    WHERE
      movie.ko_title like '%${searchTitle}%'
    `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return result;
};

async function getMovieDetail(likecnt, id) {
  const [result] = await database
    .query(
      `
    SELECT
      movie.id,
      movie.ko_title,
      movie.en_title,
      movie.description,
      movie.sub_description,
      movie.movie_poster,
      movie.movie_time,
      movie.director,
      movie.actors,
      movie.genre,
      movie.grade,
      movie.grade_simple,
      movie.viewer,
      movie.like,
      DATE_FORMAT(movie.release_date,'%y-%m-%d') AS release_date,
      movie.like,
      lt.cnt,
      mtt.type,
      avgt.rated,
      lct.likeCnt as isLiked
    FROM
      movie
    ${likecnt}
    LEFT JOIN
      (SELECT
        movie_id,
        ROUND(avg(rating),1) AS rated
      FROM
        comment
      GROUP BY movie_id) AS avgt ON movie.id = avgt.movie_id
    LEFT JOIN
      (SELECT
        movie_id,
        count(*) AS cnt
      FROM
        jegabox.like
      GROUP BY movie_id) AS lt ON movie.id = lt.movie_id
    LEFT JOIN
      (SELECT
        movie_type.movie_id,
        JSON_ARRAYAGG(movie_type_properties.movie_type) AS type
      FROM
        movie_type
      LEFT JOIN movie_type_properties ON movie_type.movie_type_properties_id = movie_type_properties.id
      GROUP BY movie_type.movie_id) AS mtt ON movie.id = mtt.movie_id
    WHERE
      movie.id = ${id}
    `
    )
    .then(answer => {
      return [...answer].map(unit => {
        return { ...unit, cnt: Number(unit.cnt), type: JSON.parse(unit.type) };
      });
    });
  return result;
}

async function existLike(id) {
  const [rtn] = await database.query(`
    SELECT
      user_id,
      GROUP_CONCAT(movie_id) as movie_id
    FROM
      jegabox.like
    WHERE user_id = ${id}
    GROUP BY user_id
  `);
  return rtn;
}

module.exports = {
  getMainMovies,
  getAllMovies,
  getComingsoonMovies,
  searchText,
  searchTitle,
  getMovieDetail,
  existLike,
};
