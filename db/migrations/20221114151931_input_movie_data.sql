-- migrate:up
INSERT INTO
    `movie_type_properties` (`movie_type`)
VALUES
    ("2D"),
    ("2D ATMOS"),
    ("2D ATMOS(자막)"),
    ("2D Dolby(자막)"),
    ("2D(자막)"),
    ("3D Dolby(자막)"),
    ("3D(자막)"),
    ("2D(더빙)"),
    ("디지털가치봄");

INSERT INTO
    `movie` (`ko_title`, `en_title`, `description`, `sub_description`, `movie_time`, `director`, `grade`, `actors`, `genre`, `release_date`, `movie_poster`, `like`)
VALUES
    ("데시벨", "Decibel", "소음이 커지는 순간 폭.발.한다", '물이 끓는 주전자 소리, 창문 여는 소리, 놀이터 아이들의 웃음 소리…
    잠시 후, 거대한 굉음과 함께 단독 주택이 폭발했다는 뉴스 속보가 전해진다.', 110, "황인호", "12세이상관람가", "김래원, 이종석, 정상훈, 박병은, 이상희, 조달환, 차은우, 이민기", "액션", "2022-11-16","https://img.megabox.co.kr/SharedImg/2022/11/17/9isi3N0BKJ8ESfnrb5FtH5fNbaMAgZ2I_420.jpg", 666),
    ("블랙 팬서: 와칸다 포에버", "Black Panther: Wakanda Forever", "와칸다를 지켜라!", '거대한 두 세계의 충돌, 운명을 건 최후의 전투가 시작된다!', 161, "라이언 쿠글러", "12세이상관람가", "레티티아 라이트, 루피타 뇽오, 다나이 구리라, 안젤라 바셋, 테노치 우에르타 메히아, 윈스턴 듀크, 마틴 프리먼, 도미니크 손", "12세이상관람가", "2022-11-09","https://img.megabox.co.kr/SharedImg/2022/11/09/uR5ZxyY7zw9YetJIm0b9ozDlkoG3eTeF_420.jpg", 1800),
    ("동감", null, "1999년, '용은' 첫눈에 반하게 된 '한솔'을 사로잡기 위해", '친구에게 HAM 무전기를 빌린다.

    2022년, ‘무늬’는 인터뷰 과제를 위해', null, "서은영", "12세이상관람가", "여진구, 조이현, 김혜윤, 나인우, 배인혁", null, "2022-11-16","https://img.megabox.co.kr/SharedImg/2022/11/17/z3wMPOtN0jcNncqLZXB2YWoM2aXQJe15_420.jpg", 863),
    ("올빼미", null, "맹인이지만 뛰어난 침술 실력을 지닌 '경수'는", '어의 ‘이형익’에게 그 재주를 인정받아 궁으로 들어간다.
그 무렵, 청에 인질로 끌려갔던 ‘소현세자’가 8년 만에 귀국하고,
‘인조’는 아들을 향한 반가움도 잠시 정체 모를 불안감에 휩싸인다.', 118, "안태진", "15세이상관람가", "류준열, 유해진, 최무성, 조성하, 박명훈, 김성철, 안은진, 조윤서", "스릴러", "2022-11-23","https://img.megabox.co.kr/SharedImg/2022/10/27/vwK0o0h7SNCzWpJNg7oY8K8gsc2yjNyM_420.jpg", 551),
    ("폴: 600미터", "THE FALL", "사상 최초 고공 서바이벌", '지상에서 가장 높은 600m 타워
내려갈 단 하나의 길이 끊겼다!', 107, "스콧 만", "12세이상관람가", "그레이스 캐롤라인 커리, 버지니아 가드너, 제프리 딘 모건", "스릴러, 액션", "2022-11-16","https://img.megabox.co.kr/SharedImg/2022/10/21/wzDj7JuJGuzTd2mahBmPirnoSg3uRqoO_420.jpg", 197),
    ("에브리씽 에브리웨어 올 앳 원스", "Everything Everywhere All At Once", "미국에 이민와 힘겹게 세탁소를 운영하던 에블린은 세무당국의 조사에 시달리던 어느 날", '남편의 이혼 요구와 삐딱하게 구는 딸로 인해 대혼란에 빠진다.
그 순간 에블린은 멀티버스 안에서 수천, 수만의 자신이 세상을 살아가고 있다는 사실을 알게 되고,
그 모든 능력을 빌려와 위기의 세상과 가족을 구해야하는 운명에 처한다.', 140, "다니엘 쉐이너트, 다니엘 콴", "15세이상관람가", "양자경, 스테파니 수, 키 호이 콴, 제이미 리 커티스", "액션, 코미디", "2022-10-12","https://img.megabox.co.kr/SharedImg/2022/09/23/wvATIEQIktD0lu2o737EBiV4W3TrtBnH_420.jpg", 999),
    ("[워너필소] 엑소시스트: 디렉터스컷", "The Exorcist : The Version You&#39:ve Never Seen", "악령을 쫓으려는 신부의 처절한 사투를 다룬 <엑소시스트> 본편에 미공개 장면을 추가한 감독판", null, 132, "윌리엄 프리드 킨", "15세이상관람가", "엘렌 버스틴, 막스 본 시도우", "공포(호러)", "2022-11-16","https://img.megabox.co.kr/SharedImg/2022/09/05/129Yl75l1phg6agWV6BzwicanjgRtgTM_420.jpg", 240),
    ("프로메어", "Promare", "모든 것이 불타버릴 인류에 닥친 최대 위기!", '지구의 운명이 걸린 거대한 불꽃 전쟁이 펼쳐진다!

불을 다스리는 돌연변이 ‘버니시’의 습격을 받은 지 30년,', 111, "이마이시 히로유키", "15세이상관람가", "마츠야마 켄이치, 사카이 마사토", "애니메이션", "2022-10-20","https://img.megabox.co.kr/SharedImg/2022/10/06/JTLCBnOyPhh7mivLHdWEqqebElgaxLq6_420.jpg", 358),
    ("블로우백", "Blowback", "아픈 딸의 병원비가 절신한 닉은", '은행에 보관되어 있는 마피아의 물건을 훔치기 위해 팀을 꾸린다.
하지만, 팀원들의 배신으로 총을 맞고 훔친 물건까지 빼앗긴 닉은
구사일생으로 살아나 복수를 준비하는데...', 94, "티보 타카스", "15세이상관람가", "캠 지갠뎃, 랜디 커투어", "스릴러, 액션", "2022-11-14","https://img.megabox.co.kr/SharedImg/2022/11/02/AfVEnEFEGVQ5svyXi8904zObpGDygIRY_420.jpg", 37),
    ("자백", "Confession", "제대로 함정에 빠졌다!", '불륜 사실을 폭로하겠다는 협박을 받고 향한 호텔에서 의문의 습격을 당한 유민호(소지섭).
정신을 차려보니 함께 있던 김세희(나나)는 죽어있고, 범인은 흔적도 없이 사라졌다.', 105, "윤종석", "15세이상관람가", "소지섭, 김윤진, 나나, 최광일", "범죄, 스릴러", "2022-10-26","https://img.megabox.co.kr/SharedImg/2022/10/27/ktLEKHh4WUlcSZV5N4IWdgV9xlTIK3Os_420.jpg", 413),
    ("심야카페: 미씽 허니", "Cafe Midnight", "♥우리 결혼합니다!", '부산 산복지구대의 냉미녀 경찰, 윤
파스타집 오너 셰프 다정한 연인, 태영
누구 봐도 행복한 커플 윤과 태영은 결혼을 앞두고 있다.', 103, "정윤수", "12세이상관람가", "채서진, 이이경, 박건일, 신주환, 정영주, 문숙", "로맨스,판타지", "2022-11-17","https://img.megabox.co.kr/SharedImg/2022/11/07/jinU2KE4gUrX7I8ORgI5T5iNL4D87EW6_420.jpg", 125),
    ("극장판 짱구는 못말려: 수수께끼! 꽃피는 천하떡잎학교", "Crayon Shin-cahn: School Mystery! The Splendid Tenkasu Academy","짱구와 친구들, 명문학교에 입학하다?!", '명문 엘리트 양성학교에 체험 입학하게 된 짱구와 친구들!
좋은 성적을 내서 학교에 정식 입학하고 싶은 철수와 장난만 치려는 짱구는 크게 싸우게 된다.', 105, "타카하시 와타루", "전체관람가", null, "애니메이션", "2022-09-28","https://img.megabox.co.kr/SharedImg/2022/09/29/irEm2oBzKVuN7ZqQOuTYmtrUDo8acBql_420.jpg", 1150),
    ("인생은 아름다워", "Life is Beautiful", "내 생애 가장 빛나는 선물", '모든 순간이 노래가 된다!

무뚝뚝한 남편 ‘진봉’과 무심한 아들 딸을 위해 헌신하며 살아온 ‘세연’은', 122, "최국희", "12세이상관람가", "류승룡, 염정아, 박세완, 옹성우", "뮤지컬", "2022-09-28","https://img.megabox.co.kr/SharedImg/2022/09/29/06m9Gzvx2eKlMeNBm6aEuoAD9raGSG7D_420.jpg", 854),
    ("리멤버", "REMEMBER", "부서진 차... 손에 묻은 피... 권총 한 자루... 내가 왜 여기에 있는거지?", '뇌종양 말기, 80대 알츠하이머 환자인 한필주. 일제강점기 때 친일파들에게 가족을 모두 잃었다.
아내가 세상을 떠나자 필주는 60여 년을 계획해 온 복수를 감행하려고 한다.
그는 알바 중인 패밀리 레스토랑에서 절친이 된 20대 알바생 인규에게', 128, "이일형", "15세이상관람가", "이성민, 남주혁", "드라마", "2022-10-26","https://img.megabox.co.kr/SharedImg/2022/10/27/s7UJXiVwYdaEfRRjo9E1HqFvH7rY2NG4_420.jpg", 557),
    ("정직한 후보2", null, "거짓말 못하는 '진실의 주둥이' 컴백! 이번엔 2명?!", null, 107, "장유정", "12세이상관람가", "라미란, 김무열, 윤경호, 서현우, 박진주, 윤두준", "코미디", "2022-09-28","https://img.megabox.co.kr/SharedImg/2022/09/29/OZgzOHC1T6Jg2ZCJW0gzCrzOGUjJAbiP_420.jpg", 686),
    ("극장판 유루캠△", null, "이것은 조금 먼 미래의 겨울부터 시작되는 이야기", null, 120, "쿄고쿠 요시아키", "전체관람가", "하나모리 유미리, 토야마 나오, 타카하시 리에, 하라 사유리, 토요사키 아키", "드라마, 애니메이션", "2022-10-27","https://img.megabox.co.kr/SharedImg/2022/10/11/DRIuMPJ8jjdWkHeHfTq553zz2auJBbOd_420.jpg", 877),
    ("가재가 노래하는 곳", "Where the Crawdads Sing", "습지 소녀로 불리는 한 여자, 살인사건의 유력한 용의자로 지목되다.", null, 125, "올리비아 뉴먼", "15세이상관람가", "데이지 에드가 존스, 테일러 존 스미스, 해리스 딕킨슨, 데이빗 스트라탄, 가렛딜라헌트", "드라마", "2022-11-02","https://img.megabox.co.kr/SharedImg/2022/10/19/lsO7MiOEjCVlHoeL4WhESezSXmLrlG6H_420.jpg", 199),
    ("파이어버드", "Firebird", "1977년 냉전 시대의 에스토니아", null, 107, "피터 리베인", "15세이상관람가", "톰 프라이어, 올렉 자고로드니, 다이애나 포자르스카, 재이크 헨더슨, 마르구스 프랑겔, 니콜라스 우더슨", "전쟁", "2022-11-17","https://img.megabox.co.kr/SharedImg/2022/11/15/Y8OWN7cZKCcIz4FBO5Ce6kH9ixNGIGHs_420.jpg", 166),
    ("[ROH 오페라] 아이다", "[ROH OPERA] AIDA", "새롭게 탄생된 베르디의 정치 드라마", null, 188, null, "전체관람가", null, "공연", "2022-11-21","https://img.megabox.co.kr/SharedImg/2022/11/08/uiPhmr6kfU5hIZwxBU730WHsytYeMF27_420.jpg", 121),
    ("수프와 이데올로기", "Soup and Ideology", "일본인 사위를 극구 반대하던 부모님.", null, 118, "양영회", "12세이상관람가", "강정희, 양영회, 아라이, 카오루", "다큐멘터리", "2022-10-20","https://img.megabox.co.kr/SharedImg/2022/10/06/VEW3ol1v0JngWNlzkScV4vzNBR3UCsj1_420.jpg", 76),
    ("같은 속옷을 입는 두 여자", "The Apartment with Two Women", "여느 날과 다름없이 다투던 중", null, 140, "김세인", "15세이상관람가", "임지호, 양말복, 양흥주, 정보람", "드라마", "2022-11-10","https://img.megabox.co.kr/SharedImg/2022/11/03/tK7JgPe760M3RjSJPYYftktjjOXBO5Gm_420.jpg", 39),
    ("[워너필소] 브이 포 벤데타", "V For Vendetta", null, null, 132, "제임스 맥티그", "15세이상관람가", "나탈리 포트만, 휴고 위빙", "액션", "2022-11-02","https://img.megabox.co.kr/SharedImg/2022/09/05/pshGbPkxbpD93qWajPgJMo71BymEmj1Q_420.jpg", 443),
    ("블랙 아담", "Black Adam", "누구도 막을 수 없다!", null, 124, "자움 콜렛 세라", "12세이상관람가", "드웨인 존슨, 노아 센티네오, 피어스 브로스넌, 퀸테사 스윈들, 알디스 호지, 사라 샤이", "SF, 액션, 어드벤처", "2022-10-19","https://img.megabox.co.kr/SharedImg/2022/10/13/TnglPxaL6kXOO8KI7PNDTDgua4HXGHwV_420.jpg", 533),
    ("트랜스", "Trans", "트랜스휴머니즘이라고 들어봤니?", null, 92, "도내리", "15세이상관람가", null, "SF, 미스터리, 스릴러, 판타지", "2022-11-17","https://img.megabox.co.kr/SharedImg/2022/11/03/EJDrUYoWPxjbKxkfPKCPXpJ9A7AFTEU5_420.jpg", 35),
    ("[오페라] 햄릿 @The Met", "Hamlet @The Met", "유려한 현대음악, 쟁쟁한 가수들의 불꽃 튀는 경연!", null, 194, null, "12세이상관람가", null, "공연", "2022-10-11","https://img.megabox.co.kr/SharedImg/2022/10/04/twH3LsNQgWGZTh6PJKFbLXBILPZ9Xt8U_420.jpg", 78);

INSERT INTO
    `movie_type` (movie_id, movie_type_properties_id)
VALUES
    (1, 1), (1, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (3, 1), (4, 1), (5, 5), (6, 3), (6, 5), (7, 5), (8, 5), (9, 5), (10, 1), (11, 1), (12, 8), (13, 1), (13, 2), (13, 9),
    (14, 1), (15, 1), (15, 9), (16, 5), (17, 5), (18, 5), (19, 5), (20, 1), (21, 1), (22, 5), (23, 3), (23, 4), (23, 5), (24, 1), (25, 5);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE movie_type_properties;
TRUNCATE TABLE movie;
TRUNCATE TABLE movie_type;
SET foreign_key_checks = 1;
