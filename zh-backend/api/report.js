const express = require('express');
const router = express.Router();
const authUser = require('../config/auth-user');
const authOrg = require('../config/auth-org');

const ReportService = require('../services/report');
const ReportServiceInstance = new ReportService();

router.get('/', authOrg, async (req, res) => {
    try {
        const reports = await ReportServiceInstance.getReports(req.get("auth-token"));
        res.json(reports);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/:reportId', authOrg, async (req, res) => {
    try {
        const reports = await ReportServiceInstance.getReportById(req.get("auth-token"), req.params.reportId);
        res.json(reports);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/', authUser, async (req, res) => {
    try {
        const report = await ReportServiceInstance.addReport(req.get("auth-token"), req.userId._id, req.body);
        res.json(report);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;