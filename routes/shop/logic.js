const shopDao = require('./dao');

async function shop() {
  return await shopDao.shop();
}

module.exports = {
  shop,
};
