const express = require('express');
const router = express.Router();
const auth = require('../config/auth-user');

const ReportService = require('../services/report');
const ReportServiceInstance = new ReportService();

router.get('/', async (req, res) => {
    try {
        const reports = await ReportServiceInstance.getReports();
        res.json(reports);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/:reportId', async (req, res) => { 
    try {
        const report = await ReportServiceInstance.getReportById(req.params.reportId);
        res.json(report);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const report = await ReportServiceInstance.addReport(req.userId._id, req.body);
        res.json(report);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;