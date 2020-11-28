const mongoose = require('mongoose')

const NonProfitSchema = new mongoose.Schema({
    name: String,
    totalDonations: Number,
}, { timestamps: true });

module.exports = mongoose.model('non-profit', NonProfitSchema);