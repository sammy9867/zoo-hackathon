const Report = require("../models/report");

class ReportService {

    async getReports () {
        try {
            const reports = await Report.find();
            return reports;
        } catch (err) {
            return err;
        }
    }

    async getReportById (id) {
        try {
            const report = await Report.findById(id);
            return report;
        } catch (err) {
            return err;
        }
    }

    async addReport (reportBody) {
        const report = new Report({
            userId: reportBody.userId,
            forestId: reportBody.forestId,
            location: {
                latitude: reportBody.location.latitude,
                longitude: reportBody.location.longitude,
            },
            certainty: reportBody.certainty
        });

        try {
            const savedReport = await report.save();
            return savedReport;
        } catch (err) {
            return err;
        }
    }

}

module.exports = ReportService;