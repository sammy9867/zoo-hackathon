const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    certainty: Number,
    isLowCertainty: Number,
    lat: String,
    lng: String,
    time: String, 

})

module.exports = mongoose.model('report', reportSchema)
