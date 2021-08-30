const cache = require('../../cache');
const cartsDao = require('./dao');

const getCustomersCart = async (customerId) => {
  const cart = await cartsDao.getCustomersCart(customerId);

  if (cart) {
    cache.set('cartId', cart.id);
  }

  return cart;
};

const getCartItems = async () => {
  const cartId = cache.get('cartId');

  if (cartId) {
    return await cartsDao.getCartItems(cartId);
  }
};

const createCart = async (customerId, currentDate) => {
  await cartsDao.createCart(customerId, currentDate);
  const cart = await cartsDao.getCustomersCart(customerId);

  cache.set('cartId', cart.id);
  return cart;
};

const addToCart = async (product, cartId) => {
  return await cartsDao.addToCart(product, cartId);
};

const updateCart = async (product, cartId) => {
  return await cartsDao.updateCart(product, cartId);
};

const deleteFromCart = async (productId, cartId) => {
  return await cartsDao.deleteFromCart(productId, cartId);
};

const emptyCart = async (cartId) => {
  await cartsDao.emptyCart(cartId);
};

module.exports = {
  getCustomersCart,
  createCart,
  addToCart,
  updateCart,
  deleteFromCart,
  emptyCart,
  getCartItems,
};
