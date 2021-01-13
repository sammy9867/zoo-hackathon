const mongoose = require('mongoose')

const UserFeedSchema = new mongoose.Schema({
    userId: String,
    description: String,
    report: Boolean,
    reward: Boolean,
    donation: Boolean,
    location: {
        latitude: Number,
        longitude: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('user-feed', UserFeedSchema);