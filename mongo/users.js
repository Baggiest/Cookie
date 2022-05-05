const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    balance: {type: Number, required:true, default: 0 },
    serverID: {type: String, required: false},
    lastReward: {type: Number, default: 1},
    isCunt: {type: Boolean, required: false}
})

module.exports = mongoose.model("Users", userSchema)