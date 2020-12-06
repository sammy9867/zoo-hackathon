const mongoose = require('mongoose')

const DonationSchema = new mongoose.Schema({
    userId: String,
    nonProfitId: String,
    donations: Number
}, { timestamps: true });

module.exports = mongoose.model('donation', DonationSchema);