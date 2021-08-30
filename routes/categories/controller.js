const express = require('express');
const router = express.Router();

const cache = require('../../cache');
const categoriesLogic = require('./logic');

router.get("/", async (req, res, next) => {
  try {
      const allCategories = await categoriesLogic.getAllCategories();
      res.json(allCategories);
  }
  catch (err) {
      return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const categoryId = req.params.id;
  const cartId = cache.get("cartId");

  try {
      const products = await categoriesLogic.getCategoryProducts(cartId, categoryId);
      res.json(products);
  }
  catch (err) {
      return next(err);
  }
});

module.exports = router;
