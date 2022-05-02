/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { join, format } = require('path');
const Client = require('./client/client');
const SettingsProvider = require('./client/settings-provider');
const CommandsModule = require('./client/modules/commands');
const config = require('./config.json');
const moment = require('moment');
const { AutoPoster } = require('topgg-autoposter')
const connectDB = require('./mongo/script')


require("dotenv").config();


// LTS here just means that moment will 
// format the time in [H:M:S AM/PM] 
const time = moment().format("LTS")

// to do, trim off the unnecessary guilds and perms
// spoilers i didnt

const clientOptions = {
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
};

const settings = new SettingsProvider(config);
const client = new Client(clientOptions, settings);

const commandsModule = new CommandsModule();
commandsModule.loadFromDirectory(join(__dirname, 'commands'));


// sends server count to top.gg
// const poster = AutoPoster(config.topggToken, client.client)

// poster.on('posted', (stats) => { // ran when succesfully posted
//   console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
// })


// ... gets member count
let getMemberCount = () => {
  return client.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b);
}

async function bootstrap() {
  await client.registerModule('commands', commandsModule);



  client.registerEvent('ready', async () => {

    // do i really have to explain when this shit runs
    console.log(`[${time}] Ready!`);
    client.client.user.setActivity(`The cookie economy is working for ${getMemberCount()} people`)

    console.log(`serving ${client.client.guilds.cache.size} mfs [${getMemberCount()}]`)


  });

  //when mfs add the bot to their server
  client.registerEvent('guildCreate', () => {
    console.log(`[${time}] Some mf really added this mf to their server 💀 [${client.client.guilds.cache.size}] [${getMemberCount()}]`);

  });

  //when bozos kick ben
  client.registerEvent('guildDelete', () => {
    console.log(`[${time}] Kicked didnt ask [${client.client.guilds.cache.size}]`);

  });


  await client.init();
}



connectDB().then(() => {
  bootstrap();
}) 
