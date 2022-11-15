require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
