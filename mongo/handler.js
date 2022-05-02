/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */

const { Message } = require('discord.js');
const mongoose = require('mongoose')

const User = require('./users')

let emotes = {
    "cookie": "<:Cookie:970644679353831424>"
}

module.exports = class Handler {


    constructor(caller) {
        console.log(`${caller} is running!`)
    }

    async fetchData(ID) {

        let userData = await User.findOne({
            userID: ID
        });

        if (!userData) {
            this.createUser(ID)
        }

        else {

            return userData
        }

        console.log(userData)

    }

    async userValidate(m) {


        let mfID = m.author.id;
        let stamp = m.createdTimestamp;

        let userExists = await User.exists({ userID: mfID })
        //console.log(await userExists)

        if (userExists) {
            m.reply("nah bro you already have an account fuck off")

        }

        else {

            this.createUser(mfID).then(() => {

                m.reply(`W profile created! here's 4 cookies ${emotes.cookie}`)
            })
        }
    }

    async createUser(ID) {

        console.log(`doing ${ID}`)

        let user = await User.create({
            userID: ID,
            balance: 4
        })

        await user.save()

        console.log(`created profile for ${ID}`)

        }

    payUser() {

    }

    async getBalance(m) {

        let discID = m.author.id;

        let userData = await this.fetchData(discID)

        if (!userData) {
            m.reply(`You dont have an account, making one for you :) + 4 cookies! ${emotes.cookie}`)
        } 
        
        else {
            m.reply(`You have ${userData.balance} Cookies `)
        }
    }
}
