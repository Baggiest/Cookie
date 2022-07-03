let link = "https://cdn.discordapp.com/attachments/920553861796728913/993232366996832337/unknown.png"

module.exports = {
    name: 'dababy', 
    description: 'dababy',
    cooldown: 5,
    async execute(message) {
        message.reply(link)
    },
};