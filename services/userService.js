const userDao = require('../models/userDao');
const bcrypt = require('bcryptjs');

const noEngNumReg = /[^a-zA-Z0-9]/gi;
const noEngNumSpeReg = /[^a-zA-Z0-9`₩~!@#$%^&*()_+{}:"<>?=\[/\]/;',.\|\-]/gi;
const engReg = /[a-zA-Z]/gi;
const numReg = /[0-9]/gi;
const speReg = /[`₩~!@#$%^&*()_+{}:"<>?=\[/\]/;',.\|\-]/gi;
const emailReg = /[a-zA-Z0-9\-_+=]+@[a-zA-Z0-9\-_+=]+[\.]+\w{2,}/gi;

//회원가입
const signUp = async (
  birthday,
  phone_number,
  account_id,
  password,
  passwordForCheck,
  email,
  name
) => {
  //--------------생년월일검증로직시작----------------//
  //입력받은 생일의 불필요한 문자 제거
  birthday = birthday.replaceAll(/\W/g, ''); //birthday - 문자열
  if (birthday.length !== 8) {
    throw new Error('BIRTHDAY IS INVALID');
  }
  //생일을 년,월,일 별로 분해 및 유효성 검사
  const birthday_year = birthday.slice(0, 4);
  const birthday_month = birthday.slice(4, 6);
  const birthday_day = birthday.slice(6, 8);
  if (birthday_year > 2023 || birthday_year < 1900) {
    throw new Error('BIRTHDAY IS INVALID : YEAR');
  }
  if (birthday_month > 12) {
    throw new Error('BIRTHDAY IS INVALID : MONTH');
  }
  if (birthday_day > 31) {
    throw new Error('BIRTHDAY IS INVALID : DAY');
  }
  //필터링 한 생일의 년,월,일 단위를 -을 삽입하여 구분
  birthday =
    birthday.slice(0, 4) +
    '-' +
    birthday.slice(4, 6) +
    '-' +
    birthday.slice(6, 8);
  //--------------생년월일검증로직끝----------------//

  //--------------전화번호검증로직시작----------------//
  //입력받은 전화번호의 불필요한 문자 제거
  phone_number = phone_number.replaceAll(/\D/g, '');
  if (!(phone_number[0] == 0 && phone_number[1] == 1)) {
    throw new Error('PHONE NUMBER IS INVALD : SHOULD BE 01*~');
  }
  if (!(phone_number.length === 10 || phone_number.length === 11)) {
    throw new Error('PHONE NUMBER IS INVALD : LENGTH');
  }
  //--------------전화번호검증로직끝----------------//

  //--------------id검증로직시작----------------//
  //id에 영어문자가 없을 시 오류 발생
  if (account_id.search(engReg) === -1) {
    throw new Error('ID MUST INCLUDES ENGLISH CHARACTERS');
  }
  //id에 숫자가 없을 시 오류 발생
  if (account_id.search(numReg) === -1) {
    throw new Error('ID MUST INCLUDES NUMBERS');
  }
  //id가 6~12자리가 아닐 시 오류 발생
  if (account_id.length < 4 || account_id.length > 16) {
    throw new Error('ID MUST BE 4~16 DIGITS');
  }
  //id에 스페이스가 있을 시 오류 발생
  if (account_id.search(/\s/) > -1) {
    throw new Error('SPACE IS NOT ALLOWED FOR ID');
  }
  //id에 영어, 숫자외의 문자가 입력 될 시 오류 발생
  if (account_id.search(noEngNumReg) !== -1) {
    throw new Error('ID ONLY INLCUDES ENGLISH CHARACTERS, NUMBERS');
  }
  //--------------id검증로직끝----------------//

  //--------------비밀번호검증로직시작----------------//
  //비밀번호가 일치하지 않을 경우 오류 발생
  if (password !== passwordForCheck) {
    throw new Error('PASSWORDS DO NOT MATCH');
  }
  //비밀번호가 6~20자리가 아닐 시 오류 발생
  if (password.length < 6 || password.length > 20) {
    throw new Error('PASSWORD MUST BE 6~20 DIGITS');
  }
  //비밀번호에 스페이스가 있을 시 오류 발생
  if (password.search(/\s/) > -1) {
    throw new Error('SPACE IS NOT ALLOWED FOR PASSWORD');
  }
  //비밀번호를 구성하는 변수 종류를 variablesCount으로 측정
  let variablesCount = 0;
  if (password.search(engReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(numReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(speReg) !== -1) {
    variablesCount += 1;
  }
  //비밀번호를 구성하는 변수의 종류가 2종 이하일 경우 오류 발생
  if (variablesCount < 2) {
    throw new Error(
      'PASSWORD MUST HAVE AT LEAST TWO ELEMENTS BETWEEN ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //비밀번호에 영어, 특수문자, 숫자 이외의 문제가 입력될 시 오류 발생
  if (password.search(noEngNumSpeReg) !== -1) {
    throw new Error(
      'PASSWORD ONLY INCLUDES ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //--------------비밀번호검증로직끝----------------//

  //--------------이메일검증----------------//
  if (email.search(emailReg) === -1) {
    throw new Error('EMAIL IS INVALID');
  }

  //----------------------------------------------------//

  const userByPhoneNumber = await userDao.checkIfPhoneNumberExists(
    phone_number
  );
  if (userByPhoneNumber) {
    console.log('userByPhoneNumber', userByPhoneNumber);
    const error = new Error(
      `PHONE NUMBER '${phone_number}' IS ALREADY BEING USED`
    );
    error.statusCode = 404;
    throw error;
  }

  //----------------------------------------------------//

  const salt = bcrypt.genSaltSync();
  const hashed_password = bcrypt.hashSync(password, salt);

  await userDao.signUp(
    birthday,
    phone_number,
    account_id,
    hashed_password,
    email,
    name
  );
};

//로그인
const signIn = async (account_id, password) => {
  const userInDB = await userDao.userInDB(account_id);
  if (!userInDB) {
    const error = new Error('NO USER DATA IN DB');
    error.statusCode = 404;
    throw error;
  }
  const pwSame = bcrypt.compareSync(password, userInDB.password);
  if (!pwSame) {
    const error = new Error('INCORRECT PASSWORD');
    error.statusCode = 400;
    throw error;
  }
  return userInDB;
};

//계정중복확인
const checkIfIDExists = async account_id => {
  const userInDB = await userDao.userInDB(account_id);
  if (userInDB) {
    const error = new Error(`ID '${account_id}' IS ALREADY BEING USED`);
    error.statusCode = 404;
    throw error;
  }
};

//아이디찾기
const findID = async (name, birthday, phone_number) => {
  //--------------생년월일검증로직시작----------------//
  //입력받은 생일의 불필요한 문자 제거
  birthday = birthday.replaceAll(/\W/g, '');
  if (birthday.length !== 8) {
    throw new Error('BIRTHDAY IS INVALID');
  }
  //생일을 년,월,일 별로 분해 및 유효성 검사
  const birthday_year = birthday.slice(0, 4);
  const birthday_month = birthday.slice(4, 6);
  const birthday_day = birthday.slice(6, 8);
  if (birthday_year > 2023 || birthday_year < 1900) {
    throw new Error('BIRTHDAY IS INVALID : YEAR');
  }
  if (birthday_month > 12) {
    throw new Error('BIRTHDAY IS INVALID : MONTH');
  }
  if (birthday_day > 31) {
    throw new Error('BIRTHDAY IS INVALID : DAY');
  }
  //필터링 한 생일의 년,월,일 단위를 -을 삽입하여 구분
  birthday =
    birthday.slice(0, 4) +
    '-' +
    birthday.slice(4, 6) +
    '-' +
    birthday.slice(6, 8);
  //--------------생년월일검증로직끝----------------//

  //--------------전화번호검증로직시작----------------//
  //입력받은 전화번호의 불필요한 문자 제거
  phone_number = phone_number.replaceAll(/\D/g, '');
  if (!(phone_number[0] == 0 && phone_number[1] == 1)) {
    throw new Error('PHONE NUMBER IS INVALD : SHOULD BE 01*~');
  }
  if (!(phone_number.length === 10 || phone_number.length === 11)) {
    throw new Error('PHONE NUMBER IS INVALD : LENGTH');
  }
  //--------------전화번호검증로직끝----------------//
  const userByPhoneNumber = await userDao.IDInDB(name, birthday, phone_number);
  return userByPhoneNumber;
};

const userCheckforValidateNumber = async (account_id, name, phone_number) => {
  const userInfo = await userDao.userCheckforValidateNumber(
    account_id,
    name,
    phone_number
  );
  if (!userInfo) {
    throw new Error('INVALID ID, NAME, PHONE NUMBER');
  }
  return userInfo;
};

//비밀번호 재설정
const resetPassword1 = async (account_id, password, passwordForCheck) => {
  //--------------비밀번호검증로직시작----------------//
  //비밀번호가 일치하지 않을 경우 오류 발생
  if (password !== passwordForCheck) {
    throw new Error('PASSWORDS DO NOT MATCH');
  }
  //비밀번호가 6~20자리가 아닐 시 오류 발생
  if (password.length < 6 || password.length > 20) {
    throw new Error('PASSWORD MUST BE 6~20 DIGITS');
  }
  //비밀번호에 스페이스가 있을 시 오류 발생
  if (password.search(/\s/) > -1) {
    throw new Error('SPACE IS NOT ALLOWED FOR PASSWORD');
  }
  //비밀번호를 구성하는 변수 종류를 variablesCount으로 측정
  let variablesCount = 0;
  if (password.search(engReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(numReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(speReg) !== -1) {
    variablesCount += 1;
  }
  //비밀번호를 구성하는 변수의 종류가 2종 이하일 경우 오류 발생
  if (variablesCount < 2) {
    throw new Error(
      'PASSWORD MUST HAVE AT LEAST TWO ELEMENTS BETWEEN ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //비밀번호에 영어, 특수문자, 숫자 이외의 문제가 입력될 시 오류 발생
  if (password.search(noEngNumSpeReg) !== -1) {
    throw new Error(
      'PASSWORD ONLY INCLUDES ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //--------------비밀번호검증로직끝----------------//
  const salt = bcrypt.genSaltSync();
  const hashed_password = bcrypt.hashSync(password, salt);
  await userDao.resetPassword(account_id, hashed_password);
};

//비밀번호 재설정
const resetPassword2 = async (account_id, password, passwordForCheck) => {
  const pwSame = bcrypt.compareSync(password, userInDB.password);
  if (!pwSame) {
    const error = new Error('INCORRECT PASSWORD');
    error.statusCode = 400;
    throw error;
  }
  //--------------비밀번호검증로직시작----------------//
  //비밀번호가 일치하지 않을 경우 오류 발생
  if (password !== passwordForCheck) {
    throw new Error('PASSWORDS DO NOT MATCH');
  }
  //비밀번호가 6~20자리가 아닐 시 오류 발생
  if (password.length < 6 || password.length > 20) {
    throw new Error('PASSWORD MUST BE 6~20 DIGITS');
  }
  //비밀번호에 스페이스가 있을 시 오류 발생
  if (password.search(/\s/) > -1) {
    throw new Error('SPACE IS NOT ALLOWED FOR PASSWORD');
  }
  //비밀번호를 구성하는 변수 종류를 variablesCount으로 측정
  let variablesCount = 0;
  if (password.search(engReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(numReg) !== -1) {
    variablesCount += 1;
  }
  if (password.search(speReg) !== -1) {
    variablesCount += 1;
  }
  //비밀번호를 구성하는 변수의 종류가 2종 이하일 경우 오류 발생
  if (variablesCount < 2) {
    throw new Error(
      'PASSWORD MUST HAVE AT LEAST TWO ELEMENTS BETWEEN ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //비밀번호에 영어, 특수문자, 숫자 이외의 문제가 입력될 시 오류 발생
  if (password.search(noEngNumSpeReg) !== -1) {
    throw new Error(
      'PASSWORD ONLY INCLUDES ENGLISH & SPECIAL CHARACTERS, NUMBERS'
    );
  }
  //--------------비밀번호검증로직끝----------------//
  const salt = bcrypt.genSaltSync();
  const hashed_password = bcrypt.hashSync(password, salt);
  await userDao.resetPassword(account_id, hashed_password);
  return userInDB;
};

const requestMypage = async account_id => {
  const userInDB = await userDao.userInDB(account_id);
  return userInDB;
};

const modifyMypage = async (account_id, email) => {
  const userInDB = await userDao.modifyMypage(account_id, email);
  return userInDB;
};

const deleteAccount = async (account_id, password) => {
  const userInDB = await userDao.userInDB(account_id);
  if (!userInDB) {
    const error = new Error('NO USER DATA IN DB');
    error.statusCode = 404;
    throw error;
  }
  const pwSame = bcrypt.compareSync(password, userInDB.password);
  if (!pwSame) {
    const error = new Error('INCORRECT PASSWORD');
    error.statusCode = 400;
    throw error;
  }
  await userDao.deleteAccount(account_id);
};

module.exports = {
  signUp,
  signIn,
  checkIfIDExists,
  findID,
  userCheckforValidateNumber,
  resetPassword1,
  resetPassword2,
  requestMypage,
  modifyMypage,
  deleteAccount,
};
