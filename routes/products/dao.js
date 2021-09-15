const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const getProducts = async() => {
    const sql = `
  SELECT p.id, p.product_name AS 'productName', p.price, p.image, p.category_id AS 'categoryId', c.category_name AS 'categoryName'
  FROM products p
  JOIN categories c 
  ON c.id = p.category_id;
  `;

    try {
        const allProducts = await connection.execute(sql);
        return allProducts;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

const updateProduct = async(product) => {
    const sql = `
  UPDATE products 
  SET product_name=?, price=?, image=?, category_id=?
  WHERE (id = ?);
  `;

    product.productName = product.productName.toLowerCase();
    const parameters = [
        product.productName,
        product.price,
        product.image,
        product.categoryId,
        product.id,
    ];

    try {
        const updatedProductId = await connection.executeWithParameters(
            sql,
            parameters
        );
        return await getProduct(updatedProductId.insertId);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

const addProduct = async(product) => {
    const sql = `
  INSERT INTO products (product_name, price, image, category_id)
  values (?, ?, ?, ?);
  `;

    product.productName = product.productName.toLowerCase();
    const parameters = [
        product.productName,
        product.price,
        product.image,
        product.categoryId,
    ];

    try {
        const newProductId = await connection.executeWithParameters(
            sql,
            parameters
        );

        return await getProduct(newProductId.insertId);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

const getProduct = async(productId) => {
    const sql = `
  SELECT p.id, p.product_name, p.price, p.image,  p.category_id AS 'categoryId', c.category_name AS 'categoryName'
  FROM products p
  JOIN categories c 
  ON c.id = p.category_id
  WHERE p.id = ?`;

    try {
        const newProduct = await connection.executeWithParameters(sql, productId);
        return newProduct[0];
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

const searchProduct = async(cartId, input) => {
    const sql = `
  SELECT p.id, p.product_name AS 'productName', p.price, p.image, IFNULL(ci.total_price, 0) AS 'totalPrice'
  FROM products p
  LEFT JOIN (SELECT * FROM cart_items WHERE cart_id = ?) ci 
  ON ci.product_id = p.id  WHERE p.product_name LIKE ?;
  `;

    const parameters = [cartId, input];

    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
};

module.exports = {
    getProducts,
    updateProduct,
    addProduct,
    searchProduct,
};