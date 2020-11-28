const mongoose = require('mongoose')

const ForestSchema = new mongoose.Schema({
    name: String,
    city: String,
    country: String,
}, { timestamps: true });

module.exports = mongoose.model('forest', ForestSchema);