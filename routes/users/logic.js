const ServerError = require('../../middlewares/error-handling/server-error');
const ErrorType = require('../../middlewares/error-handling/error-type');
const cache = require('../../cache');
const usersDao = require('./dao');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

const RIGHT_SALT = 'kh432523vkjh52vj4';
const LEFT_SALT = 'h23v4jh2v3jh42v';

const login = async(user) => {
    let userLoginData;

    //Reloggin in case of refresh
    if (user.id) {
        userLoginData = await usersDao.reLogin(user.id);
    } else {
        validateUserCredentials(user);
        user.password = crypto
            .createHash('md5')
            .update(LEFT_SALT + user.password + RIGHT_SALT)
            .digest('hex');
        userLoginData = await usersDao.login(user);
    }

    let saltedUserName = LEFT_SALT + userLoginData.username + RIGHT_SALT;
    const token = jwt.sign({ sub: saltedUserName }, config.secret);
    cache.set(token, userLoginData);

    let res = {
        token,
        isAdmin: userLoginData.isAdmin,
        userDetails: userLoginData,
    };
    return res;
};

const firstStageRegister = async(user) => {
    validateUserCredentials(user);
    if (user.id === null || user.id === '') {
        throw new ServerError(ErrorType.ID_REQUIRED);
    }
    if (user.confirmPassword !== user.password) {
        throw new ServerError(ErrorType.PASSWORDS_DONT_MATCH);
    }

    await usersDao.isUserExist(user);
};

const secondStageRegister = async(user) => {
    // Second step validations
    if (
        user.firstName === null ||
        user.firstName === '' ||
        user.firstName === undefined ||
        user.lastName === null ||
        user.lastName === '' ||
        user.lastName === undefined ||
        user.city === null ||
        user.city === '' ||
        user.city === undefined ||
        user.street === null ||
        user.street === '' ||
        user.street === undefined
    ) {
        throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
    }

    user.password = crypto
        .createHash('md5')
        .update(LEFT_SALT + user.password + RIGHT_SALT)
        .digest('hex');
    await usersDao.register(user);
};

const validateUserCredentials = (user) => {
    if (user.email === null || user.email === '') {
        throw new ServerError(ErrorType.EMAIL_REQUIRED);
    }
    if (user.password === null || user.password === '') {
        throw new ServerError(ErrorType.PASSWORD_REQUIRED);
    }
};

module.exports = {
    login,
    secondStageRegister,
    firstStageRegister,
};