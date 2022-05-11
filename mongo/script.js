/* eslint-disable no-undef */
const mongoose = require('mongoose')
const config = require('../config.json')


module.exports = async function connectDB() {

    mongoose.connect(config.mongoURL, async () => {

        console.log("Mongo is running!")
    })
}
