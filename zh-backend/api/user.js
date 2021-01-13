const express = require('express');
const router = express.Router();
const auth = require('../config/auth-user');

const UserService = require('../services/user');
const UserServiceInstance = new UserService();
const NonProfitService = require('../services/non-profit');
const NonProfitServiceInstance = new NonProfitService();

router.get('/feeds', auth, async (req, res) => { 
    try {
        const feeds = await UserServiceInstance.getRecentFeedByUserId(req.get("auth-token"), req.userId._id, 1);
        res.json(feeds);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/reports', auth, async (req, res) => { 
    try {
        const report = await UserServiceInstance.getReportsByUserId(req.get("auth-token"), req.userId._id);
        res.json(report);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/donations', auth, async (req, res) => { 
    try {
        const donations = await UserServiceInstance.getDonationsByUserId(req.get("auth-token"), req.userId._id);
        res.json(donations);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/rewards', auth, async (req, res) => { 
    try {
        const rewards = await UserServiceInstance.getRewardsByUserId(req.get("auth-token"), req.userId._id);
        res.json(rewards);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/donate', auth, async (req, res) => {
    // Donate to NonProfit
    let savedDonations;
    try {
        savedDonations = await UserServiceInstance.donateToNonProfit(req.get("auth-token"), req.userId._id, req.body);
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

router.post('/login', async (req, res) => {
    try {
        const token = await UserServiceInstance.loginUser(req.body);
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        await UserServiceInstance.logoutUser(req.userId._id);
        res.send("Logged Out");
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await UserServiceInstance.registerUser(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;