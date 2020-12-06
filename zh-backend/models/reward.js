const mongoose = require('mongoose')

const RewardSchema = new mongoose.Schema({
    organizationId: String,
    userId: String,
    reward: Number,
}, { timestamps: true });

module.exports = mongoose.model('reward', RewardSchema);