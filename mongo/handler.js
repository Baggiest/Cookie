/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */

const { Message } = require('discord.js');
const mongoose = require('mongoose')
const User = require('./users')


module.exports = class Handler {

    constructor() {
        console.log("ran!")
    }

    async userValidate(m) {


        let mfID = m.author.id;
        let stamp = m.createdTimestamp;

        let userExists = await User.exists({ userID: mfID })
        //console.log(await userExists)

        if (userExists) {

            m.reply("nah bru fuck off")
        } 
        
        else {

            this.createUser(mfID).then(()=>{

                m.reply("W profile created")
            })
        }
    }

    async createUser(ID) {

        console.log(`doing ${ID}`)

        let user = await User.create({
            userID: ID,
            balance: 0
        })

        await user.save()

        console.log(`created profile for ${ID}`)
    }

    payUser() {

    }
}
