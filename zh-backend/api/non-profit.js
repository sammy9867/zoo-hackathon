const express = require('express');
const router = express.Router();
const auth = require('../config/auth-user');

const NonProfitService = require('../services/non-profit');
const NonProfitServiceInstance = new NonProfitService();

router.get('/', auth, async (req, res) => {
    try {
        const non_profits = await NonProfitServiceInstance.getNonProfits(req.get("auth-token"));
        res.json(non_profits);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;