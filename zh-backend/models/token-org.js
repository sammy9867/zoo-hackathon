const mongoose = require('mongoose')

const TokenOrgSchema = new mongoose.Schema({
    organizationId: String,
    accessToken: String,
});

module.exports = mongoose.model('token-org', TokenOrgSchema);