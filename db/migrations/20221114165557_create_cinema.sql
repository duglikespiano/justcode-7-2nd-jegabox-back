-- migrate:up
INSERT INTO
	`location` (`location_name`)
VALUES
	("서울"),
	("경기"),
	("인천");

INSERT INTO
	`cinema` (`location_id`, `cinema_name`)
VALUES
	(1, "강남"),
	(1, "강남대로(씨티)"),
	(2, "고양스타필드"),
	(2, "광명AK플라자"),
	(2, "광명소하"),
	(3, "검단"),
	(3, "송도");


INSERT INTO
	`movie_cinema` (`movie_id`, `cinema_id`)
VALUES
	(2, 1), (6, 1), (8, 1), (10, 1), (12, 1), (13, 1), (14, 1), (16, 1), (23, 1), (2, 2), (6, 2), (10, 2), (12, 2), 
	(2, 3), (6, 3), (8, 3) ,(10, 3), (12, 3), (13, 3), (14, 3), (16, 3), (17, 3), (21, 3), (22, 3), (23, 3), (2, 4), (6, 4), (8, 4), (10, 4),
	(12, 4), (14, 4), (16, 4), (17, 4), 
	(21, 4), (22, 4), (23, 4),  (2, 5), (10, 5),(12, 5), (13, 5), (14, 5), (23, 5), (2, 6), (6, 6), (10, 6), (12, 6), (13, 6), (14, 6), (23, 6);


-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE location;
TRUNCATE TABLE cinema;
TRUNCATE TABLE movie_cinema;
SET foreign_key_checks = 1;

