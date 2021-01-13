const express = require('express');
const router = express.Router();
const auth = require('../config/auth-user');

const ForestService = require('../services/forest');
const ForestServiceInstance = new ForestService();

router.get('/', async (req, res) => {
    try {
        const forests = await ForestServiceInstance.getForests(req.get("auth-token"));
        res.json(forests);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/:forestId/random-location', auth, async (req, res) => {
    try {
        const location = await ForestServiceInstance.getRandomLocationByForestId(req.get("auth-token"), req.params.forestId);
        res.json(location);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;