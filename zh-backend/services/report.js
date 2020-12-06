const Report = require('../models/report');
const ReportValidation = require('../validations/report');
const ReportValidationInstance = new ReportValidation();

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

    async addReport (userId, reportBody) {
        let errors;
        errors = await ReportValidationInstance.validateReport(userId, reportBody);
        if(errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        const report = new Report({
            userId,
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