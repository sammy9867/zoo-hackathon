const express = require('express');
const router = express.Router();
const auth = require('../config/auth-org');

const OrganizationService = require('../services/organization');
const OrganizationServiceInstance = new OrganizationService();

router.post('/login', async (req, res) => {
    try {
        const token = await OrganizationServiceInstance.loginOrganization(req.body);
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        await OrganizationServiceInstance.logoutOrganization(req.organizationId._id);
        res.send("Logged Out");
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const organization = await OrganizationServiceInstance.registerOrganization(req.body);
        res.json(organization);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/reward', auth, async (req, res) => {
    try {
        const savedRewards = await OrganizationServiceInstance.sendRewardsToUser(req.get("auth-token"), req.organizationId._id, req.body);
        res.json(savedRewards)
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;