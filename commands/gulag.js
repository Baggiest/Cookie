const Handler = require('../mongo/handler')
const handler = new Handler()
const leFunnyGif = 'https://tenor.com/view/rip-bozo-gif-22294771'

module.exports = {
    name: 'gulag',
    description: 'send help',
    cooldown: 5,
    async execute(m) {

        const mString = m.content;
        const mSplit = mString.split(' ')

        const userID = mSplit[2].substring(2, 20)
        let userIsBanned = handler.isBanned(userID)

        if (m.author.id === '602245248634192117') {


            let isBanned = await handler.setBan(userID).then(() => {
                userIsBanned ? m.reply(`User <@${userID}> \n${leFunnyGif} has been gulaged, ripbozo, no more cookies`) : m.reply(`User <@${userID}> is unbanned now <:Okay:931961254493421599>`)
            })

            console.log(isBanned)
        }
        else{
            m.reply('Fat')
        }
    },
};