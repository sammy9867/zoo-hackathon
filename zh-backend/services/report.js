const Report = require('../models/report');
const ReportValidation = require('../validations/report');
const ReportValidationInstance = new ReportValidation();

const OrganizationValidation = require('../validations/organization');
const OrganizationValidationInstance = new OrganizationValidation();

const UserFeed = require('../models/user-feed');
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

        const userFeed = new UserFeed({
            userId,
            description: `You reported an activity with ${reportBody.certainty}% certainty.`,
            report: true,
            location: {
                latitude: reportBody.location.latitude,
                longitude: reportBody.location.longitude,
            }
        })

        try {
            const savedReport = await report.save();
            await userFeed.save();

            return savedReport;
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

}

module.exports = ReportService;