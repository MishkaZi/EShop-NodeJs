const express = require('express');
const router = express.Router();
const uploadFile = require('../../middlewares/uploadFile');

const cache = require('../../cache');
const productsLogic = require('./logic');

router.get('/', async (req, res, next) => {
  try {
    const products = await productsLogic.getProducts();
    res.json(products);
  } catch (error) {
    return next(error);
  }
});

router.post('/', uploadFile, async (req, res, next) => {
  const newProductDetails = req.body;

  try {
    const newProduct = await productsLogic.addProduct(newProductDetails);
    res.json(newProduct);
  } catch (error) {
    return next(error);
  }
});

router.put('/', uploadFile, async (req, res, next) => {
  const productDetails = req.body;

  try {
    const updatedProduct = await productsLogic.updateProduct(productDetails);
    res.json(updatedProduct);
  } catch (error) {
    return next(error);
  }
});

//Search products
router.get('/search/:input', async (req, res, next) => {
  const input = ('%' + req.params.input + '%').toLowerCase();
  const cartId = cache.get('cartId');

  try {
    const products = await productsLogic.searchProduct(cartId, input);
    res.json(products);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
