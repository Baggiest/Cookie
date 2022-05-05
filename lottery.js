/* eslint-disable no-unused-vars */
const Handler = require("./mongo/handler");
const moment = require('moment');
const caller = "lottery"
const handler = new Handler(caller)
const User = require('./mongo/users')
const config = require('./config.json')

const emotes = {
    "cookie": "<:Cookie:970644679353831424>",
    "giveCookie": "<a:GiveCookieL:969572361911275531>"
}



module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83
    const messageID = m.author.id;
    const userData = await handler.fetchData(messageID)
    const lastRewarded = userData.lastReward
    const messageTimestamp = m.createdTimestamp
    const time = moment()

    // console.log(await userData)
    // console.log(`message at ${messageTimestamp} and last reward at ${lastRewarded}`)

    function prizeAmount() {

        let p = Math.floor(Math.random() * 10) + 1;
        console.log(`giving the mf ${p}`)
        return p;

    }

    getsPrize() // no subroutines??? megamind face

    function getsPrize() {

        let r = Math.floor(Math.random() * 100) + 1;
        //generates a number between 1 & 100
        console.log(r)

        if ((r >= 96) && (time.unix() - lastRewarded > config.rewardCooldown)) { //can only be rewarded every 20 seconds

            //wins amounts of cookies that should be decided in the other function
            const num = prizeAmount()

            m.reply(`YOU WON ${num} COOKIES ${emotes.cookie} !`).then(() => {

                handler.addBal(messageID, num).then(async () => { // give the money and make sure

                    await User.findOneAndUpdate({ userID: messageID }, { // then update the last time they got rewarded

                        lastReward: messageTimestamp

                    })
                })
            })
        }
    }
}