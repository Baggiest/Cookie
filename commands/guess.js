const Handler = require("../mongo/handler");
const caller = 'guessing game'
const handler = new Handler(caller)

module.exports = {
    name: 'guess',
    description: 'guessing game',
    cooldown: 5,
    async execute(message) {

        const mString = message.content;
        const mSplit = mString.split(' ')

        const sentGuess = Number(mSplit[2])

        const r = Math.floor(Math.random() * 100) + 1;

        if (typeof (sentGuess === 'string') && r === sentGuess) {

            message.reply('YOU GUESSED CORRECTLY! HERES 20 COOKIES').then(async () => {
                handler.addBal(message.author.id, 20)
                
            })
        }
    },
};
