const express = require('express');
const router = express.Router();
const shopLogic = require('./logic');

router.get('/', async (req, res, next) => {
  try {
    const shop = await shopLogic.shop();
    res.json(shop);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
