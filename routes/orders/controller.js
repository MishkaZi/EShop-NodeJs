const express = require('express');
const router = express.Router();

const ordersLogic = require('./logic');
const cache = require('../../cache');

//Get shipping dates
router.get("/", async (req, res, next) => {
  try {
    const allShipDates = await ordersLogic.getShippingDates();
    res.json(allShipDates);
  }
  catch (err) {
    return next(err);
  }
});

//Order
router.post("/", async (req, res, next) => {
  const orderDetails = req.body;
  const cartId = cache.get("cartId");
  const customerId = cache.extractUserDataFromCache(req).id;

  try {
    await ordersLogic.order(orderDetails, cartId, customerId);
    res.json();

  } catch (err) {
    return next(err);
  }
});


module.exports = router;
