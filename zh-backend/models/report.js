const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    userId: String,
    forestId: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    certainty: Number
}, { timestamps: true });

module.exports = mongoose.model('report', ReportSchema);