/* eslint-disable no-unused-vars */

const Handler = require("../mongo/handler")
const caller = "sign up"
const handler = new Handler(caller)

module.exports = {

    name: "gemme",
    description: "for the cookie signup!",

    async execute(message) {

        await handler.userValidate(message, caller)
    }
}

