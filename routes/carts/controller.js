const express = require('express');
const router = express.Router();

const cache = require('../../cache');
const cartsLogic = require('./logic');

router.get("/", async (req, res, next) => {
  try {
      const customerId = cache.extractUserDataFromCache(req).id;
      
      const customerCart = await cartsLogic.getCustomersCart(customerId);
      res.json(customerCart);
  }
  catch (err) {
      return next(err);
  }
});

router.post("/", async (req, res, next) => {
  const currentDate = req.body.currentDate;

  try {
      const customerId = cache.extractUserDataFromCache(req).id;
      const customerCart = await cartsLogic.createCart(customerId, currentDate);

      res.json(customerCart);
  }
  catch (err) {
      return next(err);
  }
});

//Cart items
router.get("/items", async (req, res, next) => {
  try {
      const cartItems = await cartsLogic.getCartItems();
      res.json(cartItems);
  }
  catch (err) {
      return next(err);
  }
});

// Add item to cart
router.post("/items", async (req, res, next) => {
  const product = req.body;
  const cartId = cache.get("cartId");

  try {
      const newCartItem = await cartsLogic.addToCart(product, cartId);
      res.json(newCartItem);
  }
  catch (err) {
      return next(err);
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
  catch (err) {
      return next(err);
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
  catch (err) {
      return next(err);
  }
});

// Delete items from cart
router.delete("/items", async (req, res, next) => {
  const cartId = cache.get("cartId");

  try {
      await cartsLogic.emptyCart(cartId);
      res.json();
  }
  catch (err) {
      return next(err);
  }
});

module.exports = router;
