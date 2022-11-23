const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

//회원가입
const signUp = async (req, res) => {
  try {
    const {
      birthday,
      phone_number,
      account_id,
      password,
      passwordForCheck,
      email,
      name,
    } = req.body;
    const REQUIRE_KEYS = {
      birthday,
      phone_number,
      account_id,
      password,
      passwordForCheck,
      email,
      name,
    };
    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });
    // id중복 한 번 더 체크
    await userService.checkIfIDExists(account_id);
    await userService.signUp(
      birthday,
      phone_number,
      account_id,
      password,
      passwordForCheck,
      email,
      name
    );
    message = `USER '${account_id}' SIGNED UP`;
    console.log(message);
    res.status(201).json({ message: message });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//로그인
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
    let message = `USER '${account_id}' SIGNED IN`;
    const id = userInDB.id;
    account_id = userInDB.account_id;

    const token = jwt.sign(
      {
        type: 'JWT',
        id: id,
        account_id: account_id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30000000000000000000m', // 만료시간 30분
        issuer: 'Jegabox',
      }
    );

    res.status(200).json({
      code: 200,
      account_id: account_id,
      message: message,
      token: token,
    });
    console.log(userInDB);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//계정중복확인
const checkIfIDExists = async (req, res) => {
  try {
    let { account_id } = req.body;
    const REQUIRE_KEYS = { account_id };

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        error.statusCode = 400;
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    await userService.checkIfIDExists(account_id);

    message = `ID '${account_id}' CAN BE USED FOR NEW USER`;
    console.log(message);

    res.status(200).json({
      code: 200,
      message: message,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//아이디찾기
const findID = async (req, res) => {
  try {
    let { name, birthday, phone_number } = req.body;
    const REQUIRE_KEYS = { name, birthday, phone_number };

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    const userByPhoneNumber = await userService.findID(
      name,
      birthday,
      phone_number
    );

    account_id = userByPhoneNumber.account_id;
    message = `USER ID is '${account_id}'`;
    console.log(message);

    res.status(200).json({
      code: 200,
      message: message,
      userID: account_id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const issueTokenTofindPassword = async (req, res) => {
  try {
    let { account_id, name, phone_number } = req.body;
    const REQUIRE_KEYS = { account_id, name, phone_number };

    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    await userService.issueTokenTofindPassword(account_id, name, phone_number);
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
    message = `USER ID is '${account_id}'`;
    console.log(message);

    res.status(200).json({
      code: 200,
      message: message,
      token: token,
      userID: account_id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    //토큰으로부터 account_id 특정
    const verifiedToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    const account_id = verifiedToken.account_id;
    if (!account_id) {
      throw new Error('VALID TOKEN NEEDED');
    }
    //req.body로부터 비밀번호와 체크용비밀번호 확인
    const { password, passwordForCheck } = req.body;
    const REQUIRE_KEYS = { password, passwordForCheck };
    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });
    await userService.resetPassword(account_id, password, passwordForCheck);
    message = `USER '${account_id}''s PASSWORD HAS BEEN RESET`;
    console.log(message);
    res.status(200).json({
      code: 200,
      message: message,
      userID: account_id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const nodeCache = require('node-Cache');
const myCache = new nodeCache({ stdTTL: 5, checkperiod: 100 }); //<--캐쉬생성, ttl을 5초로 설정

const check = async () => {
  //난수 생성 함수
  let randomNumber = 0;
  let num = Math.random();
  for (let i = 10; parseInt(num * i) < 1000000; i = i * 10) {
    randomNumber = num * i;
    randomNumber = parseInt(randomNumber);
  }

  let randomNumberObj = { randomNumber };
  myCache.set('randomNumberObj', randomNumberObj);
  console.log('check1 no timeout ', myCache.get('randomNumberObj'));
  // myCache.del('myKey');

  setTimeout(() => {
    //<--timeout을 적용하여 삭제 여부를 확인
    console.log('Delayed for 3 seconds');
    console.log('check1 timeout 3sec', myCache.get('randomNumberObj'));
  }, '3000');

  setTimeout(() => {
    //<--timeout을 적용하여 삭제 여부를 확인
    console.log('Delayed for 6 seconds');
    console.log('check1 timeout 6sec', myCache.get('randomNumberObj'));
  }, '6000');
};

const check2 = async () => {
  //<--캐시 저장값의 스코프 확인(set없이도 사용한지 확인)
  console.log('check2 no timeout', myCache.get('randomNumberObj'));
};

module.exports = {
  signUp,
  signIn,
  checkIfIDExists,
  findID,
  issueTokenTofindPassword,
  resetPassword,
  check,
  check2,
};
