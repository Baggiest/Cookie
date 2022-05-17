const Handler = require("../mongo/handler")
const Stock = require('../api/stocks')

const caller = "buying stock CMD"

const handler = new Handler(caller)
const stock = new Stock()


module.exports = {
    name: 'help',
    description: 'send help',
    cooldown: 5,
    async execute(message) {

    
    },
};
