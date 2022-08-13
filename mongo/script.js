/* eslint-disable no-undef */
const mongoose = require('mongoose')
const config = require('../config.json')
const State = require('../mongo/state')


module.exports = async function connectDB() {

    // 

    mongoose.connect(config.mongoURL, {
        "auth": { "authSource": "cookies" },
        "user": config.mongoUser.username,
        "pass": config.mongoUser.password
    })
    
    .then(async () => {
        console.log("Mongo is running!")

        let stateExists = await State.exists({})
        console.log("cuck", stateExists)

        if (stateExists) {
            // why did this work first try ???????
            console.log("state object is aight")

        } else {

            let newState = await State.create({
                jackpot: 5,
            })
            console.log(newState)
        }
    })
}
