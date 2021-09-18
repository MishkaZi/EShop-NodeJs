const express = require('express');
const router = express.Router();

const cache = require('../../cache');
const cartsLogic = require('./logic');

router.get("/", async (req, res, next) => {
  try {
      const userId = cache.extractUserDataFromCache(req).id;
      
      const customerCart = await cartsLogic.getCustomersCart(userId);
      res.json(customerCart);
  }
  catch (error) {
      return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const currentDate = req.body.currentDate;

  try {
      const userId = cache.extractUserDataFromCache(req).id;
      const customerCart = await cartsLogic.createCart(userId, currentDate);

      res.json(customerCart);
  }
  catch (error) {
      return next(error);
  }
});

//Cart items
router.get("/items", async (req, res, next) => {
  try {
      const cartItems = await cartsLogic.getCartItems();
      res.json(cartItems);
  }
  catch (error) {
      return next(error);
  }
});

// Add item to cart
router.post("/items", async (req, res, next) => {
  const product = req.body;
  // const cartId = cache.get("cartId");
  const cartId = 4;

  try {
      const newCartItem = await cartsLogic.addToCart(product, cartId);
      res.json(newCartItem);
  }
  catch (error) {
      return next(error);
  }
});

// Update cart
router.put("/items", async (req, res, next) => {
  const product = req.body;
  const cartId = cache.get("cartId");

  try {
      const updatedCartItem = await cartsLogic.updateCart(product, cartId);
      res.json(updatedCartItem);
  }
  catch (error) {
      return next(error);
  }
});

// Remove item from cart
router.delete("/items/:id", async (req, res, next) => {
  const productId = req.params.id;
  const cartId = cache.get("cartId");

  try {
      await cartsLogic.deleteFromCart(productId, cartId);
      res.json();
  }
  catch (error) {
      return next(error);
  }
});

// Delete items from cart
router.delete("/items", async (req, res, next) => {
  const cartId = cache.get("cartId");

  try {
      await cartsLogic.emptyCart(cartId);
      res.json();
  }
  catch (error) {
      return next(error);
  }
});

module.exports = router;
