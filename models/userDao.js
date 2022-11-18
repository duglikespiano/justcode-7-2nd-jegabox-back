const bcrypt = require('bcryptjs');
const { DataSource } = require('typeorm');
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

const pong = async (req, res) => {
  console.log('i am in userDao');
};

//회원가입
const signUp = async (
  birthday,
  phone_number,
  account_id,
  hashed_password,
  email,
  name
) => {
  await myDataSource.query(`
    INSERT INTO USER (birthday, phone_number, account_id, password, email, name)
    VALUES (
    '${birthday}', '${phone_number}', '${account_id}', '${hashed_password}', '${email}', '${name}'
    )
    `);
};

//ID로 사용자 찾기
const userInDB = async account_id => {
  const [userInDB] = await myDataSource.query(`
    SELECT * FROM USER WHERE account_id = '${account_id}'
    `);
  return userInDB;
};

//전화번호 DB등록 여부 확인
const checkIfPhoneNumberExists = async phone_number => {
  const [userByPhoneNumber] = await myDataSource.query(`
    SELECT * FROM USER WHERE phone_number = '${phone_number}'
  `);
  return userByPhoneNumber;
};

//생일, 전화번호로 유저 찾기
const IDInDB = async (name, birthday, phone_number) => {
  const [userByPhoneNumber] = await myDataSource.query(`
    SELECT * FROM USER WHERE phone_number = '${phone_number}'
  `);

  if (!userByPhoneNumber) {
    throw new Error('NO PHONE NUMBER IN DB');
  }
  if (
    userByPhoneNumber.name !== name ||
    userByPhoneNumber.birthday !== birthday
  ) {
    throw new Error('NO ID FOUND BY PHONE NUMBER AND BIRTHDAY IN DB');
  }
  return userByPhoneNumber;
};

//비밀번호를 찾기위한 토큰 발행
const issueTokenTofindPassword = async (account_id, name, phone_number) => {
  const [findUserTofindPassword] = await myDataSource.query(`
  SELECT * FROM USER WHERE account_id = '${account_id}'AND name = '${name}' AND phone_number = '${phone_number}'
  `);
  return findUserTofindPassword;
};

//비밀번호호 재설정
const resetPassword = async (account_id, password, passwordForCheck) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      myDataSource.query(`
    UPDATE USER SET password = '${hash}' WHERE account_id ='${account_id}'
    `);
    });
  });
};

module.exports = {
  pong,
  signUp,
  userInDB,
  checkIfPhoneNumberExists,
  IDInDB,
  issueTokenTofindPassword,
  resetPassword,
};
