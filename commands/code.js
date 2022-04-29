/* eslint-disable no-unused-vars */
//feel free to star and contribute in https://github.com/mrbaggiebug/Ben-bot

const moment = require('moment');

module.exports = {
    name: 'code',
    description: 'star this repo so i can feed my 5 children',
    cooldown: 5,
    async execute(message) {
        let time = moment().format("LTS")

        console.log(`[${time}] Github`)
    },
  };
  