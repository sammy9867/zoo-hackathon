const mongoose = require('mongoose')

const DonateSchema = new mongoose.Schema({
    userId: String,
    donation: Number,
}, { timestamps: true });

module.exports = mongoose.model('donate', DonateSchema);