const NonProfit = require('../models/non-profit');
const UserValidation = require('../validations/user');
const UserValidationInstance = new UserValidation();
const TokenUser = require('../models/token-user');

class NonProfitService {

    async getNonProfits (accessToken) {
        try {
            const token = await UserValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const non_profits = await NonProfit.find();
            return non_profits;
        } catch (err) {
            return err;
        }
    }

    async updateNonProfit (id, donations) {
        try {
            const token = await UserValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        let non_profit;
        try {
            non_profit = await NonProfit.findById(id);
        } catch (err) {
            return err;
        }

        try {
            const updatedDonation = non_profit.donations + donations;
            await NonProfit.findByIdAndUpdate(id, { donations: updatedDonation }, { new: true });
        } catch (err) {
            return err;
        }

        try {
            non_profit = await NonProfit.findById(id);
            return non_profit;
        } catch (err) {
            return err;
        }
    }
}

module.exports = NonProfitService;