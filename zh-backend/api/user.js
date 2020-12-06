const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const UserService = require('../services/user');
const UserServiceInstance = new UserService();

const NonProfitService = require('../services/non-profit');
const NonProfitServiceInstance = new NonProfitService();

router.post('/login', async (req, res) => {
    try {
        const token = await UserServiceInstance.loginUser(req.body);
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(500).send(err);
    }
});

// router.post('/logout', async (req, res) => {
//     try {
//         const token = await UserServiceInstance.logout(req.body);
//         res.header('auth-token', token).send(token);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

router.post('/register', async (req, res) => {
    try {
        const user = await UserServiceInstance.registerUser(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.post('/donate', auth, async (req, res) => {
    // Donate to NonProfit
    let savedDonations;
    try {
        savedDonations = await UserServiceInstance.donateToNonProfit(req.userId, req.body);
        if (!savedDonations.nonProfitId || !savedDonations.donations) {
            return res.status(500).json(savedDonations);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
    
    // Update Non Profit
    try {
        const non_profit = await NonProfitServiceInstance.updateNonProfit(savedDonations.nonProfitId, savedDonations.donations);
        return res.json(non_profit);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;