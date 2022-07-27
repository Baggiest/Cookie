/* eslint-disable no-unused-vars */
const config = require("../config.json");
const Handler = require("../mongo/handler");
const caller = 'guessing game'
const User = require('../mongo/users')
const State = require('../mongo/state')
const handler = new Handler(caller)
const crypto = require('node:crypto');

module.exports = {
    name: 'guess',
    description: 'guessing game',
    cooldown: 2000,
    async execute(message) {

        const userData = await handler.fetchData(message.author.id)
        const mString = message.content;
        const mSplit = mString.split(' ')
        const mTime = Math.floor(message.createdTimestamp / 1000)

        let lastRew = await userData.lastPlayed

        const sentGuess = Math.floor(Number(mSplit[2]))

        function getRandomInt(method, min, max) { 
            if(method == 'math') {
                var random = Math.floor(Math.random() * (max - min + 1)) + min;
                return random;
            } else if(method == 'crypto') {
                var byteArray = new Uint8Array(1);
                crypto.webcrypto.getRandomValues(byteArray); 
                var randomNum = '0.' + byteArray.toString();
                random = Math.floor(randomNum * (max - min + 1)) + min;
                return random;
            };
        };
        const r = getRandomInt('crypto', 1, 100)

        console.log("message", mTime)
        // console.log("mongo", lastRew)
        console.log('sent guess', sentGuess)


        console.log("delta", mTime - lastRew)

        if (mTime - lastRew > 10) {

            if (typeof (sentGuess) === 'number' && (r === sentGuess)) {

                let currentState = await State.findOne({})
                message.reply(`**YOU GUESSED CORRECTLY! HERES ${currentState.jackpot} COOKIES**`)


                    .then(async () => {
                        handler.addBal(message.author.id, currentState.jackpot)

                        await User.findOneAndUpdate({ userID: message.author.id }, {
                            lastReward: mTime,
                            lastPlayed: mTime,
                            $inc: {
                                timesPlayed: + 1,
                                timesWon: +1
                            },
                            userTag: message.author.tag
                        })
                        await State.updateOne({}, {
                            jackpot: 1,
                            lastWinner: userData.userTag,
                            winTimestamp: mTime
                        })
                    })
            }

            else {

                if (sentGuess <= 100 && sentGuess >= 1) {

                    let rand = Math.floor(Math.random() * 10)
                    let jackpotIncrease;

                    if (rand >= 5) {
                        jackpotIncrease = 1
                    }
                    else {
                        jackpotIncrease = 2
                    }
                    console.log("rand", rand)

                    await State.updateOne({}, {
                        $inc: {
                            jackpot: jackpotIncrease
                        }
                    })

                    await User.findOneAndUpdate({ userID: message.author.id }, {

                        lastPlayed: mTime,
                        userTag: message.author.tag,
                        $inc: {
                            timesPlayed: + 1
                        }
                    })

                        .then(async () => {
                            let currentState = await State.findOne({})
                            message.reply(`You lost and the **number was ${r}** and the current **jackpot is ${currentState.jackpot}** <:Cookie:970644679353831424>!\nLatest W taker 👑 **${currentState.lastWinner}** <t:${currentState.winTimestamp}:R>`)
                        })
                }
                else {
                    let currentState = await State.findOne({})
                    message.reply(`You lost and the **number was ${r}** and the current **jackpot is ${currentState.jackpot}** <:Cookie:970644679353831424>!\nLatest W taker 👑 **${currentState.lastWinner}**`)
                }
            }
        }
        else {
            message.reply(`U gotta wait ${13 - (mTime - lastRew)} seconds fat fuck`)
            return false;
            //silence is the best answer to retards -Obama probably 
        }
    }
}
