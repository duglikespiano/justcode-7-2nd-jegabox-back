-- migrate:up
CREATE TABLE `user` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(45) COMMENT '이름',
    `birthday` varchar(20) NOT NULL COMMENT '생년월일',
    `phone_number` varchar(20) NOT NULL UNIQUE COMMENT '핸드폰 번호',
    `account_id` varchar(20) NOT NULL UNIQUE COMMENT '계정 아이디',
    `password` varchar(100) NOT NULL COMMENT '패스워드',
    `email` varchar(30) NOT NULL COMMENT '이메일',
    `profile_img` varchar(200) COMMENT '프로필 사진 주소',
    `created_at` datetime default CURRENT_TIMESTAMP
);

CREATE TABLE `movie` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `ko_title` varchar(50) COMMENT '영화 제목',
    `en_title` varchar(100),
    `description` varchar(1000) COMMENT '영화 설명',
    `viewer` int COMMENT '누적 관람수',
    `movie_time` int COMMENT '영화 시간',
    `director` varchar(20) COMMENT '감독',
    `grade` varchar(20) COMMENT '영화 관람 등급',
    `actors` varchar(300) COMMENT '배우들',
    `genre` varchar(300) COMMENT '장르',
    `release_date` datetime,
    `movie_poster` varchar(200),
    `like` int default 0
);

CREATE TABLE `movie_type` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `movie_id` int,
    `movie_type_properties_id` int
);

CREATE TABLE `movie_type_properties` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `movie_type` varchar(20) COMMENT 'ex) 2D, 3D'
);

CREATE TABLE `like` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `user_id` int COMMENT '유저 아이디',
    `movie_id` int COMMENT '영화 이름',
    `created_at` datetime default CURRENT_TIMESTAMP
);

CREATE TABLE `comment` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `user_id` int,
    `movie_id` int,
    `comment` varchar(1000) COMMENT '영화 평론',
    `rating` int COMMENT '평점',
    `created_at` datetime default CURRENT_TIMESTAMP

);

CREATE TABLE `booking` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `user_id` int,
    `showtime_id` int,
    `seat_count` int COMMENT '관람 인원',
    `seat_name` varchar(20) COMMENT '관람객석',
    `ko_title` varchar(50),
    `movie_poster` varchar(200),
    `movie_property` varchar(20),
    `cinema_name` varchar(50),
    `screen` int,
    `showtime_day` date,
    `start_time` varchar(20),
    `ticket_number` varchar(30),
    `price` int,
    `created_at` datetime default CURRENT_TIMESTAMP
);

CREATE TABLE `canceled_booking` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `user_id` int,
    `movie_title` varchar(50),
    `cinema_name` varchar(50),
    `showtime_day` date,
    `start_time` varchar(50),
    `price` int,
    `created_at` datetime default CURRENT_TIMESTAMP
);

CREATE TABLE `cinema` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `location_id` int,
    `cinema_name` varchar(50) COMMENT 'ex) 강남, 강동'
);

CREATE TABLE `location` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `location_name` varchar(50) COMMENT 'ex) 서울, 경기'
);

CREATE TABLE `movie_cinema` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `movie_id` int,
    `cinema_id` int
);

CREATE TABLE `showtime` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `movie_cinema_id` int,
    `screen` int,
    `movie_property` varchar(20),
    `showtime_day` date,
    `start_time` varchar(20) COMMENT '상영 시작 시각'
);

CREATE TABLE `showtime_seat` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `showtime_id` int,
    `seat_name` varchar(20)
);

ALTER TABLE `movie_cinema` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `movie_cinema` ADD FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`id`);

ALTER TABLE `movie_type` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `movie_type` ADD FOREIGN KEY (`movie_type_properties_id`) REFERENCES `movie_type_properties` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`);

ALTER TABLE `cinema` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

ALTER TABLE `showtime` ADD FOREIGN KEY (`movie_cinema_id`) REFERENCES `movie_cinema` (`id`);

ALTER TABLE `showtime_seat` ADD FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`);
-- migrate:down
SET foreign_key_checks = 0;
DROP TABLE `user`;
DROP TABLE `movie`;
DROP TABLE `movie_type`;
DROP TABLE `movie_type_properties`;
DROP TABLE `like`;
DROP TABLE `comment`;
DROP TABLE `booking`;
DROP TABLE `booking_seat`;
DROP TABLE `booking_canceled_record`;
DROP TABLE `region`;
DROP TABLE `location`;
DROP TABLE `cinema`;
DROP TABLE `showtime`;
DROP TABLE `showtime_seat`;
SET foreign_key_checks = 1;
