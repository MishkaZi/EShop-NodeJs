const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const getShippingDates = async () => {
  const sql = `
  SELECT shipping_date AS 'shippingDate' 
  FROM orders
  GROUP BY shipping_date HAVING COUNT(*) >= 3`;

  try {
    const busyShipDates = await connection.execute(sql);
    console.log(busyShipDates);
    return busyShipDates;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const order = async (order, cartId, customerId) => {
  const sql = `
  INSERT 
  INTO orders (cart_id, customer_id, final_price, delivery_city, delivery_street, shipping_date, order_date, credit_card) 
  VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;

  const formattedOrderDate = order.orderDate.split('T')[0];
  const formattedshippingDate = order.shippingDate.split('T')[0];

  const orderParameters = [
    cartId,
    customerId,
    order.finalPrice,
    order.shippingCity,
    order.shippingStreet,
    formattedshippingDate,
    formattedOrderDate,
    order.creditCard,
  ];

  try {
    await connection.executeWithParameters(sql, orderParameters);
    await closeCart(cartId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const closeCart = async (cartId) => {
  const sql = `
  UPDATE carts 
  SET status = 'close' 
  WHERE (id = ?);
  `;

  try {
    await connection.executeWithParameters(sql, cartId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = {
  getShippingDates,
  order,
};
