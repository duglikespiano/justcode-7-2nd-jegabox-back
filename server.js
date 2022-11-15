const dotenv = require('dotenv');
dotenv.config();

const { createApp } = require('./app');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
};

startServer();

// const express = require('express');
// const cors = require('cors');

// const routes = require('./routes');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(routes);

// const server = http.createServer(app);
// const PORT = process.env.PORT || 10010;
// server.listen(PORT, () => {
//   console.log(`server start : http://localhost:${PORT}/`);
// });
