const mongoose = require('mongoose')



const companySchema = new mongoose.Schema({
    name: {type: String, required: true},
    investors: {type: String, required: true},
    totalStake: {type: Number}
})

module.exports = mongoose.model("Companies", companySchema)