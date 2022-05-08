// const Handler = require("../mongo/handler")
// const handler = new Handler(caller)

const User = require('../mongo/users')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lb',
    description: 'its a leaderboard so these mfs shut the fuck up',
    cooldown: 5,

    async execute(message) {

        let i;
        const objects = await User.find({}).limit(15).select('balance').select('userID').sort({ balance: -1 })

        let leaderboard;

        for (i = 0; i < objects.length; i++) {

            //console.log(i + 1, objects[i].balance)
            let score = objects[i].balance.toString()
            let ID = objects[i].userID

            leaderboard += ` \n *${i + 1}.* \t **${score}** <@${ID}>`
        }
        console.log(leaderboard)

        const leaderEmbed = new MessageEmbed()
            .setTitle('People with the most cookies')
            .setColor('YELLOW')
            .setThumbnail('https://cdn.discordapp.com/attachments/883245986166759437/972292034012532838/1651882879600.png')
            .setDescription(leaderboard.replace('undefined', '').replace('1.', '👑')) // yea fuck you too

        message.channel.send({ embeds: [leaderEmbed] })
    },


};
