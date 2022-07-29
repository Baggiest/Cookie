/* eslint-disable no-unused-vars */
const Handler = require("../mongo/handler")

// Disclaimer: Code is almost entirely stolen from pay and uses the same pay mechanics for exchanging money from player to bank / casino

const caller = "slotsCMD"
const handler = new Handler(caller)
const { MessageEmbed } = require('discord.js')

const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":seven:", ":strawberry:", ":cherries:"];

module.exports = {
    name: "slots",
    description: "gamba",

    async execute(m) {

        let senderID = m.author.id
        let mString = m.content.split(" ")
        let amount = Math.floor(Number(mString[1])) // the number gotta be whole, and non NaN

        let senderData = await handler.fetchData(senderID);
        let receieverData = await handler.fetchData('00000000000000000');

        let senderIsBanned

        console.log(`${amount} ${senderID} gamba`)

        if (amount >= 1 && !isNaN(amount) && receiverID.length === 18) { // just making sure its a sane number

            if (senderID && !senderIsBanned) { // making sure they arent giving themselves

                let payment = await handler.payUser(senderID, receiverID, amount, m) //straight forward

                if (payment) {

                    let number = []
                    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
                
                    if (number[0] == number[1] && number[1] == number[2]) { 
                        cookies *= 9
                        win = true;
                    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
                        cookies *= 2
                        win = true;
                    }
                    if (win) {
                        const slotsEmbed1 = new Discord.MessageEmbed()
                            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${cookies} cookies`)
                            .setColor("RANDOM")
                        m.reply(slotsEmbed1)
                        handler.payUser('00000000000000000', senderID, amount, m)
                    }
                } else {
                    m.reply(`payment failed`)
                }
            }

            else {
                if (senderIsBanned) {
                    m.reply(`you're banned from using the network`)
                    return false;
                }
            }

        }


        else {
            m.reply('\t be unbraindead')
        }
    }
}