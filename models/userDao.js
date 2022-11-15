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

const signUp = async (
  birthday,
  phone_number,
  account_id,
  password,
  email,
  profile_img
) => {
  myDataSource.query(`
    INSERT INTO USER (birthday, phone_number, account_id, password, email, profile_img)
    VALUES (
    '${birthday}', '${phone_number}', '${account_id}', '${password}', '${email}', '${profile_img}'
    )`);
};

const userInDB = async account_id => {
  const [userInDB] = await myDataSource.query(`
    SELECT * FROM USER WHERE account_id = '${account_id}'
    `);

  return userInDB;
};
module.exports = { pong, signUp, userInDB };
