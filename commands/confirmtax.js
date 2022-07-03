const Handler = require("../mongo/handler")
const handler = new Handler("tax handler")

const comrades = require('../comrades.json')

module.exports = {
    name: 'confirm',
    description: '',
    cooldown: 5,
    async execute(m) {
        let mSplit = m.content.split(" ")
        let enforcerID = m.author.id
        let taxPayer = mSplit[2].substring(2, 20)
        console.log("tax payer is", taxPayer)

        if (JSON.stringify(comrades).includes(enforcerID)) {

            handler.confirmTax(taxPayer).then((response) => {

                if (!response === false) {
                    m.reply(`<@${taxPayer}> got unverified ❌`)
                }
                else {
                    m.reply(`<@${taxPayer}> did their taxes just now! ✅`)
                }
            })
        }
        else {
            m.reply("you are not a comrade")
        }
    },
};
