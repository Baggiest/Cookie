const Handler = require('../mongo/handler')
const handler = new Handler()

module.exports = {
    name: 'gulag',
    description: 'send help',
    cooldown: 5,
    async execute(m) {

        const mString = m.content;
        const mSplit = mString.split(' ')

        const userID = mSplit[2].substring(2, 20)

        if (m.author.id === '602245248634192117') {
            handler.setBan(userID)
        }
    },
};