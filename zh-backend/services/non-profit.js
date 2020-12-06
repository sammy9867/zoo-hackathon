const NonProfit = require('../models/non-profit');

class NonProfitService {

    async getNonProfits () {
        try {
            const non_profits = await NonProfit.find();
            return non_profits;
        } catch (err) {
            return err;
        }
    }

    async updateNonProfit (id, donations) {
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