const config = require("../config.json");
const Handler = require("../mongo/handler");
const caller = 'guessing game'
const User = require('../mongo/users')
const handler = new Handler(caller)

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

        const sentGuess = Number(mSplit[2])

        const r = Math.floor(Math.random() * 100) + 1;

        console.log("message", mTime)
        console.log("mongo", lastRew)


        console.log("delta", mTime - lastRew)

        if (mTime - lastRew > 30) {

            if (typeof (sentGuess === 'string') && (r === sentGuess)) {


                handler.addBal(message.author.id, 50)

                await User.findOneAndUpdate({ userID: message.author.id }, {
                    lastPlayed: mTime

                }).then(async () => {
                    message.reply('YOU GUESSED CORRECTLY! HERES 50 COOKIES')
                })

            } else {

                await User.findOneAndUpdate({ userID: message.author.id }, {
                    lastPlayed: mTime
                }).then(async () => {
                    message.reply(`You lost and the number was ${r}`)
                })
            }
        }
        else{
            return false;
            //silence is the best answer to retards -Obama probably 
        }
    }
}