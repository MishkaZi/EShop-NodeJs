const express = require('express');
const router = express.Router();

const cache = require('../../cache');
const usersLogic = require('./logic');

// Login
router.post('/', async (req, res, next) => {
    let userLoginDetails = req.body;
    try {
        let successfullLoginData = await usersLogic.login(userLoginDetails);
        res.json(successfullLoginData);
    } catch (error) {
        return next(error.innerError);
    }
});

// Get users data
router.get("/", async (req, res, next) => {
    const user = cache.extractUserDataFromCache(req);
    console.log(user);
    res.json(user);
});


//First stage of registration
router.post('/register', async (req, res, next) => {
    let userDetails = req.body;
    try {
        await usersLogic.firstStageRegister(userDetails);
        res.json();
    } catch (error) {
        return next(error);
    }
});

//Second stage of registration
router.post('/register2', async (req, res, next) => {
    let newUserDetails = req.body;

    try {
        await usersLogic.secondStageRegister(newUserDetails);
        res.json();
    } catch (error) {
        return next(error);
    }
});

// Logout
router.post('/logout', async (req, res, next) => {
    let token = req.body;

    try {
        cache.remove(token);
        res.json();
    } catch (error) {
        return next(error.innerError);
    }
});


module.exports = router;