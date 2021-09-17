const express = require('express');
const router = express.Router();

const cache = require('../../cache');
const usersLogic = require('./logic');

// Login
router.post('/login', async (req, res, next) => {
    let userLoginDetails = req.body;
    try {
        let successfullLoginData = await usersLogic.login(userLoginDetails);
        res.json(successfullLoginData);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

// Get users data
router.get("/", async (req, res, next) => {
    const user = cache.extractUserDataFromCache(req);
    res.json(user);
});


//First stage of registration
router.post('/register', async (req, res, next) => {
    let userDetails = req.body;
    console.log(userDetails);
    try {
        await usersLogic.firstStageRegister(userDetails);
        res.json();
    } catch (err) {
        return next(err);
    }
});

//Second stage of registration
router.post('/register2', async (req, res, next) => {
    let newUserDetails = req.body;

    try {
        await usersLogic.secondStageRegister(newUserDetails);
        res.json();
    } catch (err) {
        return next(err);
    }
});

// Logout
router.post('/logout', async (req, res, next) => {
    let token = req.body;

    try {
        cache.remove(token);
        res.json();
    } catch (err) {
        return next(err);
    }
});

// Get address
router.get('/address', async (req, res, next) => {
    try {
        let street = cache.extractUserDataFromCache(req).street;
        let city = cache.extractUserDataFromCache(req).city;

        let userAddress = { city, street };
        res.json(userAddress);
    } catch (err) {
        return next(err);
    }
});



module.exports = router;