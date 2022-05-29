const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    jackpot: { type: Number }, 
    lastWinner: {type: String}
})

module.exports = mongoose.model("State", stateSchema)