const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true });

module.exports = mongoose.model('organization', OrganizationSchema);