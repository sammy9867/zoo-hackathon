const mongoose = require('mongoose')

const DonationsSchema = new mongoose.Schema({
    userId: String,
    nonProfitId: String,
    donations: Number
}, { timestamps: true });

module.exports = mongoose.model('donation', DonationsSchema);