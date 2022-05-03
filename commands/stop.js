const config = require('../config.json')

module.exports = {
    name: "stop",
    description: "just stops the whole app",

    async execute(m) {
        if (m.author.id === config.ownerID) {

            m.reply('aight, bye then').then(() => {
                process.exit(0)
            })
        }
    }
}