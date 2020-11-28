const express = require("express");
const router = express.Router();

const ForestService = require('../services/forest');
const ForestServiceInstance = new ForestService();

router.get('/', async (req, res) => {
    try {
        const forests = await ForestServiceInstance.getForests();
        res.json(forests);
    } catch(err) {
        res.status(500).send(err);
    }
})


router.get('/:forestId', async (req, res) => { 
    try {
        const forest = await ForestServiceInstance.getForestById(req.params.forestId);
        res.json(forest);
    } catch(err) {
        res.status(500).send(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const forest = await ForestServiceInstance.addForest(req.body);
        res.json(forest);
    } catch(err) {
        res.status(500).send(err);
    }
})

module.exports = router;