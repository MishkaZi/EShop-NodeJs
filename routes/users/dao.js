const connection = require('../../connection-wrapper');
const ErrorType = require('../../middlewares/error-handling/error-type');
const ServerError = require('../../middlewares/error-handling/server-error');

const login = async(user) => {
    const sql = `
    SELECT id, email, password, first_name AS 'firstName', last_name AS 'lastName', city, street, is_admin AS 'isAdmin' 
    FROM users 
    WHERE email = ? AND password = ?;
    `;

    const parameters = [user.email, user.password];

    try {
        const usersLoginResult = await connection.executeWithParameters(
            sql,
            parameters
        );

        await userDoesntExist(usersLoginResult);
        return usersLoginResult[0];
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }
};

const reLogin = async(userId) => {
    const sql = `
    SELECT id, email, password, first_name AS 'firstName',  last_name AS 'lastName', city, street, is_admin AS 'isAdmin' 
    FROM  users 
    WHERE id = ?;
    `;

    try {
        const usersLoginResult = await connection.executeWithParameters(
            sql,
            userId
        );
        await userDoesntExist(usersLoginResult);
        return usersLoginResult[0];
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err);
    }
};

const userDoesntExist = async(usersLoginResult) => {
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
};

const isUserExist = async(user) => {
    // Exists by email
    const sqlEmailQuery = `SELECT * FROM users WHERE email = ?`;
    const paramEmail = [user.email];

    const email = await connection.executeWithParameters(
        sqlEmailQuery,
        paramEmail
    );

    if (email[0]) {
        throw new ServerError(ErrorType.EMAIL_EXIST);
    }

    // Exists by id
    const sqlIdQuery = `SELECT * FROM users WHERE id = ?`;
    const paramId = [user.id];

    const id = await connection.executeWithParameters(sqlIdQuery, paramId);
    if (id[0]) {
        throw new ServerError(ErrorType.ID_EXIST);
    }
};

const register = async(user) => {
    const sql = `
  INSERT INTO users (id, email, password, first_name, last_name, city, street) 
  VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

    const parameters = [
        user.id,
        user.email,
        user.password,
        user.firstName,
        user.lastName,
        user.city,
        user.street,
    ];

    try {
        await isUserExist(user);
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
};

module.exports = {
    login,
    reLogin,
    register,
    isUserExist,
};