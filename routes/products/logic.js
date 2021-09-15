const ServerError = require('../../middlewares/error-handling/server-error');
const ErrorType = require('../../middlewares/error-handling/error-type');
const productsDao = require('./dao');

const getProducts = async () => {
  return await productsDao.getProducts();
};

const updateProduct = async (productDetails) => {
  await productValidations(productDetails);
  return await productsDao.updateProduct(productDetails);
};

const addProduct = async (newProductDetails) => {
  await productValidations(newProductDetails);
  return await productsDao.addProduct(newProductDetails);
};

const getMarketState = async () => {
  return await productsDao.getMarketState();
};

const searchProduct = async (cartId, input) => {
  return await productsDao.searchProduct(cartId, input);
};

const productValidations = async (product) => {
  if (
    product.productName == null ||
    product.productName == '' ||
    product.image == null ||
    product.image == '' ||
    product.price == null ||
    product.categoryId == null
  ) {
    throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
  }

};

module.exports = {
  getProducts,
  updateProduct,
  addProduct,
  getMarketState,
  searchProduct,
};
