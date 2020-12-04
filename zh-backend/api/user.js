const express = require('express');
const router = express.Router();

const UserService = require('../services/user');
const UserServiceInstance = new UserService();

router.post('/login', async (req, res) => {
    try {
        const token = await UserServiceInstance.loginUser(req.body);
        res.header('auth-token', token).send(token);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await UserServiceInstance.registerUser(req.body);
        res.json(user);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;