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
    INSERT INTO user (birthday, phone_number, account_id, password, email, name)
    VALUES (
    '${birthday}', '${phone_number}', '${account_id}', '${hashed_password}', '${email}', '${name}'
    )
    `);
};

//ID로 사용자 찾기
const userInDB = async account_id => {
  const [userInDB] = await database.query(`
    SELECT * FROM user WHERE account_id = '${account_id}'
    `);
  return userInDB;
};

//전화번호 DB등록 여부 확인(전화번호 자체로 확인)
const checkIfPhoneNumberExists = async phone_number => {
  const [userByPhoneNumber] = await database.query(`
    SELECT * FROM user WHERE phone_number = '${phone_number}'
  `);
  return userByPhoneNumber;
};

//전화번호 DB등록 여부 확인(아이디로 전화번호 확인))
const checkIfPhoneNumberExists2 = async account_id => {
  const [userByPhoneNumber] = await database.query(`
    SELECT * FROM user WHERE account_id = '${account_id}' 
  `);
  return userByPhoneNumber;
};

//생일, 전화번호로 유저 찾기
const IDInDB = async (name, birthday, phone_number) => {
  const [userByPhoneNumber] = await database.query(`
    SELECT * FROM user WHERE phone_number = '${phone_number}'
  `);

  if (!userByPhoneNumber) {
    throw new Error('NO USER DATA IN DB(BY PHONE NUMBER)');
  }
  if (userByPhoneNumber.name !== name) {
    throw new Error('NO USER DATA IN DB(BY NAME)');
  }
  if (userByPhoneNumber.birthday !== birthday) {
    throw new Error('NO USER DATA IN DB(BY BIRTHDAY)');
  }
  return userByPhoneNumber;
};

const userCheckforValidateNumber = async (account_id, name, phone_number) => {
  const [userInfo] = await database.query(`
  SELECT * FROM user WHERE account_id = '${account_id}'AND name = '${name}' AND phone_number = '${phone_number}'
  `);
  return userInfo;
};

//비밀번호 재설정
const resetPassword = async (account_id, hashed_password) => {
  await database.query(`
    UPDATE user SET password = '${hashed_password}' WHERE account_id ='${account_id}'
    `);
};

//개인정보 재설정
const modifyMypage = async (account_id, email) => {
  await database.query(`
  UPDATE user SET email = '${email}' WHERE account_id = '${account_id}'
  `);
  const [userInDB] = await database.query(`
    SELECT * FROM user WHERE account_id = '${account_id}'
    `);
  return userInDB;
};

//마이페이지에서 전화번호 변경 API
const modifyPhoneNumber = async (account_id, phone_number) => {
  await database.query(`
  UPDATE user SET phone_number ='${phone_number}' WHERE account_id = '${account_id}'`);
};

//계정삭제API
const deleteAccount = async account_id => {
  await database.query(`SET foreign_key_checks = 0`);
  await database.query(`DELETE FROM user WHERE account_id='${account_id}'`);
};

module.exports = {
  signUp,
  userInDB,
  checkIfPhoneNumberExists,
  checkIfPhoneNumberExists2,
  IDInDB,
  userCheckforValidateNumber,
  resetPassword,
  modifyMypage,
  deleteAccount,
  modifyPhoneNumber,
};
