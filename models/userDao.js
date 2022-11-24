const database = require('./database');

//회원가입
const signUp = async (
  birthday,
  phone_number,
  account_id,
  hashed_password,
  email,
  name
) => {
  await database.query(`
    INSERT INTO
      user (birthday, phone_number, account_id, password, email, name)
    VALUES
    ('${birthday}', '${phone_number}', '${account_id}', '${hashed_password}', '${email}', '${name}')
  `);
};

//ID로 사용자 찾기
const userInDB = async account_id => {
  const [userInDB] = await database.query(`
    SELECT
      *
    FROM
      user
    WHERE account_id = '${account_id}'
    `);
  return userInDB;
};

//전화번호 DB등록 여부 확인
const checkIfPhoneNumberExists = async phone_number => {
  const [userByPhoneNumber] = await database.query(`
    SELECT
      *
    FROM
      user
    WHERE
      phone_number = '${phone_number}'
  `);
  return userByPhoneNumber;
};

//생일, 전화번호로 유저 찾기
const IDInDB = async (name, birthday, phone_number) => {
  const [userByPhoneNumber] = await database.query(`
    SELECT
      *
    FROM
      user
    WHERE
      phone_number = '${phone_number}'
  `);

  return userByPhoneNumber;
};

const userCheckforValidateNumber = async (account_id, name, phone_number) => {
  const [userInfo] = await database.query(`
    SELECT
      *
    FROM
      user
    WHERE
      account_id = '${account_id}' AND name = '${name}' AND phone_number = '${phone_number}'
  `);
  return userInfo;
};

//비밀번호 재설정
const resetPassword = async (account_id, hashed_password) => {
  database.query(`
    UPDATE
      user
    SET
      password = '${hashed_password}'
    WHERE
      account_id ='${account_id}'
    `);
};

//비밀번호 재설정
const modifyMypage = async (account_id, email) => {
  await database.query(`
    UPDATE
      user
    SET
      email = '${email}'
    WHERE
      account_id = '${account_id}'
  `);
  const [userInDB] = await database.query(`
    SELECT
      *
    FROM
      user 
    WHERE
      account_id = '${account_id}'
    `);
  return userInDB;
};

//계정삭제API
const deleteAccount = async account_id => {
  await myDataSource.query(`
    SET foreign_key_checks = 0
  `);
  await myDataSource.query(`
    DELETE FROM
      USERS
    WHERE
      id = '${account_id}'
  `);
};

module.exports = {
  signUp,
  userInDB,
  checkIfPhoneNumberExists,
  IDInDB,
  userCheckforValidateNumber,
  resetPassword,
  modifyMypage,
  deleteAccount,
};
