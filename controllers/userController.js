const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const pong = async (req, res) => {
  console.log('i am in userControl1');
  await userDao.pong();
  console.log('i am in userControl2');
};

const signUp = async (req, res) => {
  try {
    const { birthday, phone_number, account_id, password, email, profile_img } =
      req.body;

    const REQUIRE_KEYS = [
      birthday,
      phone_number,
      account_id,
      password,
      email,
      profile_img,
    ];

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    await userService.signUp(
      birthday,
      phone_number,
      account_id,
      password,
      email,
      profile_img
    );
    message = `USER '${account_id}' SIGNED UP`;
    console.log(message);

    res.status(201).json({ message: message });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    let { account_id, password } = req.body;
    const REQUIRE_KEYS = { account_id, password };

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    const userInDB = await userService.signIn(account_id, password);
    account_id = userInDB.account_id;
    token = jwt.sign(
      {
        type: 'JWT',
        account_id: account_id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30000000000000000000m', // 만료시간 30분
        issuer: 'Jegabox',
      }
    );
    message = `USER '${account_id}' SIGNED IN`;
    console.log(message);

    res.status(200).json({
      code: 200,
      account_id: account_id,
      message: message,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { pong, signUp, signIn };
