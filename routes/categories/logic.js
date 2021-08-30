const categoriesDao = require('./dao');

const getAllCategories = async () => {
  return await categoriesDao.getAllCategories();
};

const getCategoryProducts = async (cartId, categoryId) => {
  return await categoriesDao.getCategoryProducts(cartId, categoryId);
};

module.exports = {
  getAllCategories,
  getCategoryProducts,
};
