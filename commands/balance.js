/* eslint-disable no-unused-vars */
const Handler = require("../mongo/handler")
const caller = "balance module"
const handler = new Handler(caller)

module.exports = {
    name: "bal", 
    description: "for checking your cookie balance",

    async execute(message){
        await handler.getBalance(message)
    }
}