/* eslint-disable no-undef */
const mongoose = require('mongoose')
const config = require('../config.json')
//const User = require("./users")

module.exports = async function connectDB() {

    mongoose.connect(config.mongoURL, async () => {

        console.log("LETS GO CONNECTED")
        
    })
}
