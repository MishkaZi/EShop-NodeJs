const express = require('express');
const cors = require('cors');
const server = express();
const port = process.env.port || 3001;

const errorHandler = require('./errors/error-handler');
const loginFilter = require('./middleware/login-filter');

server.use(express.json());
server.use(express.static('public'));

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(loginFilter());

server.use(errorHandler);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
