const Handler = require("../mongo/handler")
const handler = new Handler("tax handler")

const comrades = require('../comrades.json')

module.exports = {
    name: 'check',
    description: 'check if they paid taxes or not',
    cooldown: 5,
    async execute(m) {
        let enforcerID = m.author.id

        let mSplit = m.content.split(' ')
        let taxPayer = mSplit[2].substring(2, 20)
        let response = await handler.checkTaxStatus(taxPayer)

        if (JSON.stringify(comrades).includes(enforcerID)) {

            if (response === true) {
                m.reply('they have paid their taxes ✅')
            } 
            else {
                m.reply('have not paid taxes ❌')
            }

        } else {
            m.reply('youre not a comrade')
        }
    },
};
