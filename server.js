const dotenv = require('dotenv');
dotenv.config();

<<<<<<< HEAD
const { createApp } = require('./app');
=======
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
>>>>>>> dev

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 8000;

<<<<<<< HEAD
  app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
};

startServer();
=======
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
>>>>>>> dev
