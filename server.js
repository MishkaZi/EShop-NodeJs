const express = require('express');
const cors = require('cors');
const server = express();
const PORT = process.env.port;

const errorHandler = require('./middlewares/error-handling/error-handler');
const loginFilter = require('./middlewares/login-filter');

const usersController = require('./routes/users/controller');
const categoriesController = require('./routes/categories/controller');
const shopController = require('./routes/shop/controller');
const productsController = require('./routes/products/controller');
const cartsController = require('./routes/carts/controller');
const ordersController = require('./routes/orders/controller');

server.use(express.json());
server.use(express.static('public'));

server.use(cors());
app.use("/uploads",express.static("./uploads"))

server.use(loginFilter());
server.use('/shop', shopController);
server.use('/users', usersController);
server.use('/categories', categoriesController);
server.use('/products', productsController);
server.use('/carts', cartsController);
server.use('/orders', ordersController);

server.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Running on: ${PORT}`);
});
