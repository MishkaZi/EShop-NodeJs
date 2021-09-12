const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const getAllCategories = async() => {
    let sql = `
  SELECT id, category_name as 'categoryName' 
  FROM categories;
  `;

    try {
        return await connection.execute(sql);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
};

const getCategoryProducts = async(cartId, categoryId) => {
    let sql = `
  SELECT p.id, p.product_name AS 'productName', p.price, p.image, IFNULL(ci.total_price, 0) AS 'totalPrice', 
  p.category_id AS 'categoryId', c.category_name AS 'categoryName'
  FROM products p
  JOIN categories c ON c.id = p.category_id
  LEFT JOIN (SELECT * FROM cart_items WHERE cart_id = ?) ci ON ci.product_id = p.id WHERE c.id = ?;
  `;

    let parameters = [cartId, categoryId];

    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
};

module.exports = {
    getAllCategories,
    getCategoryProducts,
};