const mongoose = require('mongoose')

const ForestSchema = new mongoose.Schema({
    name: String,
    country: String,
    coordinates: [
        [Number, Number]
    ]
}, { timestamps: true });

module.exports = mongoose.model('forest', ForestSchema);