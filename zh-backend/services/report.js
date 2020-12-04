const Report = require('../models/report');
const User = require('../models/user');
const Forest = require('../models/forest');

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
        let errors;
        errors = await this.validateReport(reportBody);
        if(errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

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

    async validateReport (reportBody) {
        const { userId, forestId, location, certainty } = reportBody;

        let errors = [];

        if (!userId || !forestId || !location.latitude || !location.longitude || !certainty) {
            errors.push({ message: "Enter all fields" });
        }

        try {
            await User.findById(userId);
        } catch (err) {
            errors.push({ message: "User not found" });
        }
      
        try {
            await Forest.findById(forestId);
        } catch (err) {
            errors.push({ message: "Forest not found" });
        }

        if(certainty < 0 || certainty > 100) {
            errors.push({ message: "Certainty should be between 1 and 100"});
        }

        return errors;
    }
}

module.exports = ReportService;