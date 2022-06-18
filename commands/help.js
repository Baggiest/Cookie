/* eslint-disable no-unused-vars */
const moment = require('moment');
const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')


const helpEmbed = new MessageEmbed()
    .setTitle('Hey Hey')
    .setImage('https://cdn.discordapp.com/attachments/883245986166759437/960615193115762740/unknown.png')
    .setDescription(
        `Uh basically, **capitalism** \n\nthe only way to get cookies is by **chatting**, every message has a ~4% chance of giving u 1-10 cookies and you can\n\n give cookies by **hey give @id (number of cookies)** \n\ncheck your balance by **hey bal** \n\nglobal leaderboard by **hey lb**\n\n also this is ben`
    )
    .setColor('PURPLE')

const row = new MessageActionRow()

    .addComponents(

        new MessageButton()
            .setStyle('LINK')
            .setLabel('Code base')
      
            .setURL('https://github.com/mrbaggiebug/cookie'),



        new MessageButton()
            .setURL('https://www.buymeacoffee.com/MrBaggieBug')
            .setLabel('Donations')
            .setStyle('LINK')
            .setEmoji('<:8bitL:942601692782936065>'),

        new MessageButton()
            .setLabel('Our support server!')
            .setURL('https://discord.gg/jb8vUDTF5s')
          
            .setStyle('LINK'),

    ),

module.exports = {
    name: 'help',
    description: 'send help',
    cooldown: 5,
    async execute(message) {
        let time = moment().format("LTS")

        message.channel.send({ embeds: [helpEmbed], components: [row] })
        
        console.log(`[${time}] H`)
    },
};
