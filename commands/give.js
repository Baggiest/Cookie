/* eslint-disable no-unused-vars */
const Handler = require("../mongo/handler")

const caller = "giveCMD"
const handler = new Handler(caller)

const emotes = {
    "cookie": "<:Cookie:970644679353831424>",
    "giveCookie": "<a:GiveCookieR:971740550845853696>",
    "que": "<:que:994015803525582878>"
}

module.exports = {
    name: "give",
    description: "for giving others cookie",

    async execute(m) {

        let senderID = m.author.id
        let mString = m.content.split(" ")

        let receiverID = mString[2].substring(2, 20) // incoming id is <@blahblah> so we gotta cut out @<>
        let amount = Math.floor(Number(mString[3])) // the number gotta be whole, and non NaN

        let senderData = await handler.fetchData(senderID);
        let receieverData = await handler.fetchData(receiverID);

        let senderIsBanned
        let recIsBanned
        
        
        let senderHasPaidTax
        let receiverHasPaidTax;

        if (receieverData != null) {
            senderIsBanned = senderData.isBanned;
            recIsBanned = receieverData.isBanned;
            
            senderHasPaidTax = senderData.hasPayed;
            receiverHasPaidTax = receieverData.hasPayed;
            console.log("both parties are valid")
        }
        else {
            m.reply("trying to pay a bot now?")
            return false;
        }

        console.log(senderData)
        console.log(receieverData)

        console.log("cock")
        console.log("receiver:", recIsBanned, "sender:", senderIsBanned)

        console.log(`${amount} ${senderID} ${receiverID}`)

        if (amount >= 1 && !isNaN(amount) && receiverID.length === 18) { // just making sure its a sane number

            if (senderID != receiverID && !recIsBanned && !senderIsBanned) { // making sure they arent giving themselves

                let payment = await handler.payUser(senderID, receiverID, amount, m) //straight forward

                if (payment) {

                    m.reply(`just gave <@${receiverID}> ${amount} cookies ${emotes.giveCookie} !`)

                }

                else {
                    m.reply(`payment failed`) //embrace the state of chaos and dont tell them what went wrong
                    // paypal should hire me
                }
            }

            else if (senderID === receiverID) {
                m.reply(`${emotes.que} ?`) // im very kind
                return false;
            }
            
            if (senderHasPaidTax && receiverHasPaidTax){
                console.log("all good")

                } else { m.reply(`${emotes.que} one of u hasnt paid their tax`); return false;}

            if (senderIsBanned && recIsBanned) {
                m.reply('YOU BOTH BANNED DAMN 💀')
                return false;
            }
            else {
                if (senderIsBanned) {
                    m.reply(`you're banned from using the network`)
                    return false;
                }
                if (recIsBanned) {
                    m.reply(`User ${receieverData.userTag} is banned off the network`)
                    return false;
                }
            }

        }


        else {
            m.reply('\t enter a fucking real amount and account \ngoofy ahh')
        }
    }
}
