const express = require('express');
const cors = require('cors');
const server = express();
const PORT = process.env.port || 3001;

const errorHandler = require('./middlewares/error-handling/error-handler');
const loginFilter = require('./middlewares/login-filter');

const usersController = require('./routes/users/controller');

server.use(express.json());
server.use(express.static('public'));

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(loginFilter());
server.use('/users', usersController);

server.use(errorHandler);

server.listen(process.env.PORT || PORT, () => {
  console.log(`Running on: ${PORT}`);
});
