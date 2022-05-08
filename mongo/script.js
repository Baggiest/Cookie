/* eslint-disable no-undef */
const mongoose = require('mongoose')
const config = require('../config.json')
const { db } = require('./users')


module.exports = async function connectDB() {

    mongoose.connect(config.mongoURL, async () => {

        console.log("Mongo is running!")
        db.users.aggregate([$project: {balance: {$divide: ["$balance", 10]}}])
    })
}
