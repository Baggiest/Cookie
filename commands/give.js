/* eslint-disable no-unused-vars */
const Handler = require("../mongo/handler")
const caller = "giveFunc"
const handler = new Handler(caller)

module.exports = {
    name: "give",
    description: "for giving others cookie",

    async execute(m) {

        let senderID = m.author.id
        let mString = m.content.split(" ")
        let receiverID = mString[2].substring(2, 17)


        let amount = Math.floor(Number(mString[3])) //the number gotta be whole, and non NaN

        console.log(`${amount} ${senderID} ${receiverID}`)

        if (amount >= 1 && !isNaN(amount)) {

            let payment = await handler.payUser(senderID.sub, receiverID, amount)

            if (payment) {
                m.reply(`just gave ${receiverID} ${amount} cookies !`)
            }
        }

        else {
            m.reply('enter a fucking real amount \n goofy ahh')
        }

        console.log(mString)
    }
}