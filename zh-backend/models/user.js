const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    totalRewards: Number
}, { timestamps: true });

module.exports = mongoose.model('organization', UserSchema);