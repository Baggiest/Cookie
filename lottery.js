/* eslint-disable no-unused-vars */
const Handler = require("./mongo/handler");
const caller = "lottery"
const handler = new Handler(caller)
const User = require('./mongo/users')
const config = require('./config.json');
const {
    delta
} = require("ccxt");

let isLotteryRunning = false;

const emotes = {
    "cookie": "<:Cookie:970644679353831424>",
    "giveCookie": "<a:GiveCookieR:971740550845853696>"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83
    const msgAuthorID = m.author.id
    const userData = await handler.fetchData(msgAuthorID)
    const mTime = Math.floor(m.createdTimestamp / 1000)
    // console.log(await userData)
    // console.log(`message at ${messageTimestamp} and last reward at ${lastRewarded}`)

    let lastRewarded = await userData.lastReward || 0
    let isBanned = await userData.isBanned || false

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

        if (r >= 99 && (mTime - lastRewarded > 400) && (isBanned === false)) {
            let newNumber = Math.floor(Math.random() * 100) + 1;

            // 20% chance of activting the lottery
            if (newNumber <= 20 && !isLotteryRunning) {
                // set the lottery to running
                isLotteryRunning = true;

                let lotteryMsg = await m.channel.send(`THE COOKIE LOTTORY HAS BEEN STARTED! ${emotes.cookie}\n\n` + `React to win up to 20 cookies!`)
                await lotteryMsg.react("🍪")

                // sleep for 60 seconds
                await sleep(60000)

                // get all users who reacted to the message
                let reaction = await lotteryMsg.reactions.cache.get("🍪")
                let users = await reaction.users.fetch()

                // filter out the bots and make an array of the users and filter if user is not banned
                let usersArray = users.filter(user => !user.bot && !isBanned)
                console.log(usersArray)

                // if there are users who reacted to the message
                if (usersArray.size > 0) {

                    // pick a random winner 
                    let winner = usersArray.random()
                    console.log(winner)

                    // get a random amount up to 20 cookies 
                    let prize = Math.floor(Math.random() * 20) + 1;

                    // send a message to the winner
                    await m.channel.send(`<@${winner.id}> won ${prize} cookies from the lottery! ${emotes.giveCookie}`)

                    handler.addBal(winner.id, prize).then(async () => {
                        try {
                            await User.findOneAndUpdate({
                                userID: winner.id,
                            }, {
                                // then update the last time they got rewarded
                                lastReward: mTime,
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    })
                }
                
                // sleep for 120 seconds
                await sleep(120000)

                isLotteryRunning = false;
            } 
            else {
                //wins amounts of cookies that should be decided in the other function
                const num = prizeAmount()

                console.log(msgAuthorID)
                m.reply(`YOU WON ${num} COOKIES ${emotes.cookie} !`)

                handler.addBal(msgAuthorID, num).then(async () => { // give the money and make sure

                    try {
                        await User.findOneAndUpdate({
                            userID: msgAuthorID

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
}
