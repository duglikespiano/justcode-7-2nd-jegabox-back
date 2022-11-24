const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const nodeCache = require('node-Cache');
const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');
const myCache = new nodeCache({ stdTTL: 180, checkperiod: 100 }); //<--캐쉬생성, ttl을 3분으로 설정

//회원가입
const signUp = async (req, res) => {
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
};

//로그인
const signIn = async (req, res) => {
  let { account_id, password } = req.body;
  const REQUIRE_KEYS = { account_id, password };


  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  const token = await userService.signIn(account_id, password);
  let message = `USER '${account_id}' SIGNED IN`;
  res.status(200).json({
    code: 200,
    account_id: account_id,
    phone_number: token.phone_number,
    message: message,
    token: token,
  });
};

//계정중복확인
const checkIfIDExists = async (req, res) => {
  const { account_id } = req.body;
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
};

//아이디찾기
const findID = async (req, res) => {
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
  created_at = userByPhoneNumber.created_at;
  let created_at_result = JSON.stringify(created_at);
  created_at_result = created_at_result.slice(1, 11);
  account_id = userByPhoneNumber.account_id;
  message = `USER ID is '${account_id}'`;
  console.log(message);

  res.status(200).json({
    code: 200,
    message: message,
    userID: account_id,
    created_at: created_at_result,
  });
};

//비밀번호 재설정 할 때 인증번호 요청API(비밀번호 찾기)
const requestValidateNumber = async (req, res) => {
  myCache.del('randomNumberObj');

  const { account_id, name, phone_number } = req.body;
  const REQUIRE_KEYS = { account_id, name, phone_number };

  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  await userService.userCheckforValidateNumber(account_id, name, phone_number);

  let randomNumber = 0;
  let num = Math.random();
  for (let i = 10; parseInt(num * i) < 1000000; i = i * 10) {
    randomNumber = num * i;
    randomNumber = parseInt(randomNumber);
  }

  let randomNumberObj = { randomNumber }; // 캐쉬에 담을 인증번호객체 정의
  myCache.set('randomNumberObj', randomNumberObj); // 인증번호객체를 캐쉬에 삽입

  // ---------------네이버SENS API 호출 로직 시작---------------------------- //
  const date = Date.now().toString();
  let accessKey = 'n3WaNH5GJER7rblX1lCF';
  let secretKey = 'TTM2LNYurVw8OIuEgUKPiuI4kcZgqOsOsccTjRGE';
  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url2 = `/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  fetch(
    'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages',
    {
      //method의 기본값은 GET이므로 POST일때는 반드시 명시해야 한다.
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
      //body에 JSON타입 데이터를 문자열로 바꿔서 body에 넣는다.
      body: JSON.stringify({
        type: 'SMS',
        countryCode: '82',
        from: '01046857815',
        content: `[제가박스] 인증번호${randomNumber} 를 입력해주세요. 인증번호는 3분간 유효합니다.`,
        messages: [{ to: `${phone_number}` }],
      }),
    }
  )
    .then(res => res.json())
    .then(json => {
      console.log('NAVER SENS API RESULT', json);
      console.log('VALIDATE NUMBER', randomNumber);
    });
  // ---------------네이버SENS API 호출 로직 끝---------------------------- //

  message = `TOKEN ISSUED. AVALIABLE TO REDIRECT PAGE TO MODIFY '${account_id}''S PASSWORD`;
  console.log(message);
  res.status(200).json({
    code: 200,
    userID: account_id,
    phone_number: phone_number,
    validate_number: randomNumber,
  });
};

//비밀번호 재설정 할 때 인증번호 확인API(비밀번호 찾기)
const checkValidateNumber = async (req, res) => {
  const { account_id, validateNumber } = req.body;
  // 사용자가 입력한 인증번호를 추출
  if (!myCache.get('randomNumberObj')) {
    // 인증번호객체가 없을 경우 에러 발생(인증시간만료)
    throw new Error('인증 시간이 만료되었습니다.');
  }
  console.log(validateNumber);
  if (myCache.get('randomNumberObj').randomNumber !== validateNumber) {
    // 사용자가 입력한 인증번호와 캐쉬 내 인증번호가 다를 경우 에러 발생
    throw new Error('인증번호가 틀립니다.');
  }
  // 사용자가 입력한 인증번호와 캐쉬 내 인증번호가 일치할 경우 토큰 발행
  console.log(myCache.get('randomNumberObj').randomNumber);
  console.log(validateNumber);
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
  message = `REDIRECT PAGE TO MODIFY '${account_id}''S PASSWORD`;
  console.log(message);
  res.status(200).json({
    code: 200,
    message: message,
    userID: account_id,
    token: token,
  });
};

//마이페이지에서 전화번호 변경 API(인증번호 확인 후 전화번호까지 변경)
const checkValidateNumber2 = async (req, res) => {
  try {
    const { account_id, validateNumber, phone_number } = req.body;
    // 사용자가 입력한 인증번호를 추출
    if (!myCache.get('randomNumberObj')) {
      // 인증번호객체가 없을 경우 에러 발생(인증시간만료)
      throw new Error('VALIDATE NUMBER EXPIRED');
    }
    if (myCache.get('randomNumberObj').randomNumber != validateNumber) {
      // 사용자가 입력한 인증번호와 캐쉬 내 인증번호가 다를 경우 에러 발생
      throw new Error('INVALID VALIDATE NUMBER');
    }
    // 사용자가 입력한 인증번호와 캐쉬 내 인증번호가 일치할 경우 비밀번호 변경
    console.log(myCache.get('randomNumberObj').randomNumber);
    console.log(validateNumber);
    await userService.modifyPhoneNumber(account_id, phone_number);
    message = `'${account_id}''S PHONE NUMBER HAS BEEN MODIFIED`;
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

//비밀번호재설정API(로그인 화면에서 비밀번호 찾기 할 때)
const resetPassword1 = async (req, res) => {
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
  await userService.resetPassword1(account_id, password, passwordForCheck);
  message = `USER '${account_id}''s PASSWORD HAS BEEN RESET`;
  console.log(message);
  res.status(200).json({
    code: 200,
    message: message,
    userID: account_id,
  });
};

//비밀번호재설정API(마이페이지에서 비밀번호 변경 할 때)
const resetPassword2 = async (req, res) => {
  //토큰으로부터 account_id 특정
  const verifiedToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
  const account_id = verifiedToken.account_id;
  if (!account_id) {
    throw new Error('VALID TOKEN NEEDED');
  }
  //req.body로부터 비밀번호와 체크용비밀번호 확인
  const { password, password_new, passwordForCheck_new } = req.body;
  const REQUIRE_KEYS = { password, password_new, passwordForCheck_new };
  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });
  await userService.resetPassword2(
    account_id,
    password,
    password_new,
    passwordForCheck_new
  );
  message = `USER '${account_id}''s PASSWORD HAS BEEN RESET`;
  console.log(message);
  res.status(200).json({
    code: 200,
    message: message,
    userID: account_id,
  });
};

const sendValidateNumber = async (req, res) => {
  myCache.del('randomNumberObj');

  const { account_id, phone_number } = req.body;
  const REQUIRE_KEYS = { account_id, phone_number };

  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  let randomNumber = 0;
  let num = Math.random();
  for (let i = 10; parseInt(num * i) < 1000000; i = i * 10) {
    randomNumber = num * i;
    randomNumber = parseInt(randomNumber);
  }

  let randomNumberObj = { randomNumber }; // 캐쉬에 담을 인증번호객체 정의
  myCache.set('randomNumberObj', randomNumberObj); // 인증번호객체를 캐쉬에 삽입

  // ---------------네이버SENS API 호출 로직 시작---------------------------- //
  const date = Date.now().toString();
  let accessKey = 'n3WaNH5GJER7rblX1lCF';
  let secretKey = 'TTM2LNYurVw8OIuEgUKPiuI4kcZgqOsOsccTjRGE';
  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url2 = `/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  fetch(
    'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages',
    {
      //method의 기본값은 GET이므로 POST일때는 반드시 명시해야 한다.
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
      //body에 JSON타입 데이터를 문자열로 바꿔서 body에 넣는다.
      body: JSON.stringify({
        type: 'SMS',
        countryCode: '82',
        from: '01046857815',
        content: `[제가박스] 인증번호는 ${randomNumber}입니다. 인증번호는 3분간 유효합니다.`,
        messages: [{ to: `${phone_number}` }],
      }),
    }
  )
    .then(res => res.json())
    .then(json => {
      console.log('NAVER SENS API RESULT', json);
      console.log('VALIDATE NUMBER', randomNumber);
    });
  // ---------------네이버SENS API 호출 로직 끝---------------------------- //

  message = `VALIDATE NUMBER TO RESET PASSWORD IS ISSUED FOR USER '${account_id}'`;
  console.log(message);
  res.status(200).json({
    code: 200,
    userID: account_id,
    phone_number: phone_number,
    validate_number: randomNumber,
  });
};

const sendValidateNumber2 = async (req, res) => {
  try {
    myCache.del('randomNumberObj');
    const { account_id, phone_number } = req.body;
    const REQUIRE_KEYS = { account_id, phone_number };
    //인증번호를 보내기 전, 전화번호가 이미 사용중인지 확인
    await userService.checkIfPhoneNumberExists(account_id, phone_number);
    Object.keys(REQUIRE_KEYS).map(key => {
      if (!REQUIRE_KEYS[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    let randomNumber = 0;
    let num = Math.random();
    for (let i = 10; parseInt(num * i) < 1000000; i = i * 10) {
      randomNumber = num * i;
      randomNumber = parseInt(randomNumber);
    }

    let randomNumberObj = { randomNumber }; // 캐쉬에 담을 인증번호객체 정의
    myCache.set('randomNumberObj', randomNumberObj); // 인증번호객체를 캐쉬에 삽입

    // ---------------네이버SENS API 호출 로직 시작---------------------------- //
    const date = Date.now().toString();
    let accessKey = 'n3WaNH5GJER7rblX1lCF';
    let secretKey = 'TTM2LNYurVw8OIuEgUKPiuI4kcZgqOsOsccTjRGE';
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages`;
    const url2 = `/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    fetch(
      'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:296406056304:jetabox/messages',
      {
        //method의 기본값은 GET이므로 POST일때는 반드시 명시해야 한다.
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': date,
          'x-ncp-apigw-signature-v2': signature,
        },
        //body에 JSON타입 데이터를 문자열로 바꿔서 body에 넣는다.
        body: JSON.stringify({
          type: 'SMS',
          countryCode: '82',
          from: '01046857815',
          content: `[제가박스] 인증번호는 ${randomNumber}입니다. 인증번호는 3분간 유효합니다.`,
          messages: [{ to: `${phone_number}` }],
        }),
      }
    )
      .then(res => res.json())
      .then(json => {
        console.log('NAVER SENS API RESULT', json);
        console.log('VALIDATE NUMBER', randomNumber);
      });
    // ---------------네이버SENS API 호출 로직 끝---------------------------- //

    message = `VALIDATE NUMBER TO RESET PASSWORD IS ISSUED FOR USER '${account_id}'`;
    console.log(message);
    res.status(200).json({
      code: 200,
      userID: account_id,
      phone_number: phone_number,
      validate_number: randomNumber,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const requestMypage = async (req, res) => {
  let { account_id } = req.body;
  const REQUIRE_KEYS = { account_id };

  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      error.statusCode = 400;
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  const userInDB = await userService.requestMypage(account_id);
  console.log(userInDB);

  let name = userInDB.name;
  let birthday = userInDB.birthday;
  let phone_number = userInDB.phone_number;
  let email = userInDB.email;

  message = `ID '${account_id}''S INFORMATION IS BEING DISPLAYED`;
  console.log(message);

  res.status(200).json({
    code: 200,
    message: message,
    name: name,
    birthday: birthday,
    phone_number: phone_number,
    email: email,
  });
};

const modifyMypage = async (req, res) => {
  let { account_id, email } = req.body;
  const REQUIRE_KEYS = { account_id, email };

  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      error.statusCode = 400;
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  const userInDB = await userService.modifyMypage(account_id, email);
  console.log(userInDB);
  email = userInDB.email;

  message = `ID '${account_id}''S INFORMATION HAS BEEN MODIFIED`;
  console.log(message);

  res.status(200).json({
    code: 200,
    message: message,
    email: email,
  });
};

const deleteAccount = async (req, res) => {
  //토큰으로부터 account_id 특정
  const verifiedToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
  const account_id = verifiedToken.account_id;
  if (!account_id) {
    throw new Error('VALID TOKEN NEEDED');
  }
  const { password } = req.body;
  const REQUIRE_KEYS = { account_id, password };

  Object.keys(REQUIRE_KEYS).map(key => {
    if (!REQUIRE_KEYS[key]) {
      error.statusCode = 400;
      throw new Error(`KEY_ERROR: ${key}`);
    }
  });

  await userService.deleteAccount(account_id, password);

  message = `ID '${account_id}''S INFORMATION HAS BEEN REMOVED`;
  console.log(message);

  res.status(200).json({
    code: 200,
    message: message,
    account_id: account_id,
  });
};

module.exports = {
  signUp,
  signIn,
  checkIfIDExists,
  findID,
  requestValidateNumber,
  checkValidateNumber,
  checkValidateNumber2,
  sendValidateNumber,
  sendValidateNumber2,
  resetPassword1,
  resetPassword2,
  requestMypage,
  modifyMypage,
  deleteAccount,
};
