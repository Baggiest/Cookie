const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    jackpot: { type: Number },
    lastWinner: { type: String },
    winTimestamp: { type: Number, default: 0 }
})

module.exports = mongoose.model("State", stateSchema)