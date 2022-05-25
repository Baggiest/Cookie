/* eslint-disable no-unused-vars */
const Handler = require("./mongo/handler");
const caller = "lottery"
const handler = new Handler(caller)
const User = require('./mongo/users')
const config = require('./config.json');
const { delta } = require("ccxt");

const emotes = {
    "cookie": "<:Cookie:970644679353831424>",
    "giveCookie": "<a:GiveCookieR:971740550845853696>"
}



module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83
    const messageID = m.author.id
    const userData = await handler.fetchData(messageID)
    const mTime = Math.floor(m.createdTimestamp / 1000)
    //let lastRewarded = userData.lastReward

    // console.log(await userData)
    // console.log(`message at ${messageTimestamp} and last reward at ${lastRewarded}`)

    let lastRewarded = await userData.lastReward
    let isBanned = await userData.isBanned

    function prizeAmount() {

        let p = Math.floor(Math.random() * 10) + 1;
        console.log(`giving the mf ${p}`)
        return p;

    }

    getsPrize() // no subroutines??? megamind face

    async function getsPrize() {

        let r = Math.floor(Math.random() * 100) + 1;
        //generates a number between 1 & 100
        console.log(r)


        //console.log(userIsBanned)
        console.log("message", mTime, "lastRew", lastRewarded, "delta", `${mTime - lastRewarded}`)

        if ((r >= 99) && (mTime - lastRewarded > 400) && (isBanned === false)) { //can only be rewarded every 20 seconds

            //wins amounts of cookies that should be decided in the other function
            const num = prizeAmount()

            console.log(messageID)
            m.reply(`YOU WON ${num} COOKIES ${emotes.cookie} !`)

            handler.addBal(messageID, num).then(async () => { // give the money and make sure

                try {
                    await User.findOneAndUpdate({
                        userID: messageID

                    }, {
                        // then update the last time they got rewarded
                        lastReward: mTime
                    })
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
}
