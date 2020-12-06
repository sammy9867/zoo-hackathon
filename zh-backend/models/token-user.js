const mongoose = require('mongoose')

const TokenUserSchema = new mongoose.Schema({
    userId: String,
    accessToken: String,
});

module.exports = mongoose.model('token-user', TokenUserSchema);