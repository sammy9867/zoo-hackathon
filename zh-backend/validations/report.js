const User = require('../models/user');
const Forest = require('../models/forest');

class ReportValidation {

    async validateReport (userId, reportBody) {
        const { forestId, location, certainty } = reportBody;

        try {
            const user = await User.findById(userId);
            if (!user) {
                throw user;
            }
        } catch (err) {
            errors.push({ message: "User not found" });
        }

        let errors = [];

        if (!forestId || !location.latitude || !location.longitude || !certainty) {
            errors.push({ message: "Enter all fields" });
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

module.exports = ReportValidation;