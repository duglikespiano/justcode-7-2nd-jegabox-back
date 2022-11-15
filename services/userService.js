const userDao = require('../models/userDao');

const pong = async (req, res) => {
  console.log('i am in userService1');
  await userDao.pong();
  console.log('i am in userService2');
};

const signUp = async (
  birthday,
  phone_number,
  account_id,
  password,
  email,
  profile_img
) => {
  await userDao.signUp(
    birthday,
    phone_number,
    account_id,
    password,
    email,
    profile_img
  );
};

const signIn = async (account_id, password) => {
  const userInDB = await userDao.userInDB(account_id);
  if (!userInDB) {
    const error = new Error('NO USER DATA IN DB');
    error.statusCode = 404;
    throw error;
  }
  if (password !== userInDB.password) {
    const error = new Error('INCORRECT PASSWORD');
    error.statusCode = 404;
    throw error;
  }
  return userInDB;
};

module.exports = { pong, signUp, signIn };
