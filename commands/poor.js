
const User = require('../mongo/users')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poor',
    description: 'its a leaderboard so these mfs shut the fuck up',
    cooldown: 5,

    async execute(message) {

        let i;
        const objects = await User.find({}).limit(5).select('balance').select('userID').sort({ balance: 1 })

        let leaderboard;

        for (i = 0; i < objects.length; i++) {

            //console.log(i + 1, objects[i].balance)
            let score = objects[i].balance.toString()
            let ID = objects[i].userID

            leaderboard += ` \n \n \t **${score}** cookies <@${ID}>`
        }
        console.log(leaderboard)

        const leaderEmbed = new MessageEmbed()
            .setTitle('Poorest people lmfao 💀')
            .setColor('YELLOW')
            .setThumbnail('https://c.tenor.com/oCxcur4d32wAAAAC/squidward-spare-change.gif')
            .setDescription(leaderboard.replace('undefined', '').replace('1.', '👑')) // yea fuck you too

        message.channel.send({ embeds: [leaderEmbed] })
    },


};
