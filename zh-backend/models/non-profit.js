const mongoose = require('mongoose')

const NonProfitSchema = new mongoose.Schema({
    name: String,
    donations: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('non-profit', NonProfitSchema);