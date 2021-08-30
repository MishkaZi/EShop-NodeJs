const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const getCustomersCart = async (customerId) => {
  const sql = `
  SELECT id, date_created AS 'createDate', status 
  FROM carts
  WHERE customer_id = ?;
  `;

  try {
    const userCarts = await connection.executeWithParameters(sql, customerId);

    const mostRecentUserCart = userCarts[userCarts.length - 1];
    return mostRecentUserCart;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const createCart = async (customerId) => {
  const sql = `
  INSERT 
  INTO carts (customer_id, date_created) 
  VALUES(?, ?);
  `;

  const currentDate = new Date().toISOString().split('T')[0];
  const parameters = [customerId, currentDate];

  try {
    await connection.executeWithParameters(sql, parameters);
    return getCustomersCart(customerId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getCartItems = async (cartId) => {
  const sql = `
  SELECT ci.product_id AS 'id', p.product_name AS 'productName', ci.quantity, p.image, ci.total_price AS 'totalPrice' 
  FROM cart_items ci
  JOIN products p ON p.id = ci.product_id
  WHERE cart_id = ?;
  `;

  try {
    return await connection.executeWithParameters(sql, cartId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const addToCart = async (product, cartId) => {
  const sql = `
  INSERT 
  INTO cart_items (cart_id, product_id, quantity, total_price) 
  VALUES(?, ?, ?, ?);
  `;

  product.price = product.price * product.quantity;
  const parameters = [cartId, product.id, product.quantity, product.price];

  try {
    await connection.executeWithParameters(sql, parameters);
    return product;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const updateCart = async (product, cartId) => {
  const sql = `
  UPDATE cart_items 
  SET quantity = ?, total_price = ?
  WHERE cart_id = ? AND product_id = ?;
  `;

  product.price = product.price * product.amount;
  const parameters = [product.amount, product.price, cartId, product.id];

  try {
    await connection.executeWithParameters(sql, parameters);
    return product;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const deleteFromCart = async (productId, cartId) => {
  const sql = `
  Delete 
  FROM cart_items 
  WHERE cart_id = ? AND product_id = ?`;
  const parameters = [cartId, productId];

  try {
    await connection.executeWithParameters(sql, parameters);
    return getCartItems(cartId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const emptyCart = async (cartId) => {
  const sql = `
  Delete 
  FROM cart_items 
  WHERE cart_id = ?;
  `;

  try {
    await connection.executeWithParameters(sql, cartId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = {
  getCustomersCart,
  getCartItems,
  createCart,
  addToCart,
  updateCart,
  deleteFromCart,
  emptyCart,
};
