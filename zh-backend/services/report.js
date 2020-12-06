const Report = require('../models/report');
const ReportValidation = require('../validations/report');
const ReportValidationInstance = new ReportValidation();

const UserValidation = require('../validations/user');
const UserValidationInstance = new UserValidation();

const OrganizationValidation = require('../validations/organization');
const OrganizationValidationInstance = new OrganizationValidation();

const TokenUser = require('../models/token-user');
const TokenOrganization = require('../models/token-org');

class ReportService {

    async getReports (accessToken) {
        try {
            const token = await OrganizationValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenOrganization)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const reports = await Report.find();
            return reports;
        } catch (err) {
            return err;
        }
    }

    async getReportById (accessToken, reportId) {
        try {
            const token = await OrganizationValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenOrganization)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const report = await Report.findById(reportId);
            return report;
        } catch (err) {
            return err;
        }
    }

    async getReportsByUserId (accessToken, userId) {
        try {
            const token = await UserValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const report = await Report.find({ userId });
            return report;
        } catch (err) {
            return err;
        }
    }

    async addReport (accessToken, userId, reportBody) {
        const errors = await ReportValidationInstance.validateReport(accessToken, userId, reportBody);
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