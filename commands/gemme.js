/* eslint-disable no-unused-vars */

const Handler = require("../mongo/handler")

const handler = new Handler()

module.exports = {

    name: "gemme",
    description: "for the cookie signup!",

    async execute(message) {

        await handler.userValidate(message)
    }
}

