const ServerError = require('../../middlewares/error-handling/server-error');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ordersDao = require('./dao');

const getShippingDates = async () => {
  return await ordersDao.getShippingDates();
};

const order = async (orderDetails, cartId, customerId) => {
  if (
    orderDetails.deliveryCity == null ||
    orderDetails.deliveryCity == '' ||
    orderDetails.deliveryCity == undefined ||
    orderDetails.deliveryStreet == null ||
    orderDetails.deliveryStreet == '' ||
    orderDetails.deliveryStreet == undefined ||
    orderDetails.creditCard == null ||
    orderDetails.creditCard == undefined ||
    orderDetails.shippingDate == null||
    orderDetails.shippingDate == undefined
  ) {
    throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
  }
  if (orderDetails.creditCard <= 1000 || orderDetails.creditCard >= 9999) {
    throw new ServerError(ErrorType.INVALID_CREDITCARD);
  }
  await ordersDao.order(orderDetails, cartId, customerId);
};

module.exports = {
  getShippingDates,
  order,
};
