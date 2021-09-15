const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const shop = async () => {
  const sql = `
  SELECT COUNT(id) AS 'products'
  FROM products
  UNION SELECT COUNT (*) AS 'orders'
  FROM orders;
  `;

  try {
    return await connection.execute(sql);
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
};

module.exports = {
  shop,
};
