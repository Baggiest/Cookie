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
            // this.createUser(ID).then(() => {
            //     return userData
            // })
        }

        else {
            return userData
        }

        console.log(userData)

    }

    async userBalance(userID) {
        //yes its the exact same as the balance func on but doesnt reply to the message, shut the fuck up i dont wanna hear it

        let userData = await this.fetchData(userID)
        return userData
    }

    async userValidate(m, from) {
        //from is asking which function called it

        let mfID = m.author.id;
        let stamp = m.createdTimestamp;

        let userExists = await User.exists({ userID: mfID })
        //console.log(await userExists)

        if (userExists) {

            if (from === "sign up") {

                m.reply("nah bro you already have an account fuck off")

            }
        }

        else {

            this.createUser(mfID).then(() => {

                //m.reply(`W profile created! here's 4 cookies ${emotes.cookie}`)
                console.log('made account for a new mf in userValidate')
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

    async checkExist(ID) {

        let response = await User.exists({
            userID: ID
        })

        if (response) {
            return true
        }
        else {
            return false
        }
    }

    async payUser(senderID, receiverID, amount) {

        if (this.checkExist(senderID) && this.checkExist(receiverID)) {

            let senderData = await this.userBalance(senderID)
            let receiverData = await this.userBalance(receiverID)
            // console.log(senderBalance.balance
            // now lets check if mf has enough balance
            if (amount > senderData.balance) {

                return false;
            }

            else {

                await this.decBal(senderID, amount).then(async () => {
                    console.log("got the money")

                    await this.addBal(receiverID, amount).then(() => {

                        console.log('payed the fucker')
                    })
                })

                return true;
            }
        }

        else {
            return false;
        }
    }


    async addBal(id, amount) {

        // find the user
        await User.findOneAndUpdate({
            userID: id,
        },
            {
                $inc: {
                    // and add the fucking balance what are you confused about
                    balance: + amount
                }

            })
    }

    async decBal(id, amount) {

        await User.findOneAndUpdate({
            userID: id,
        },
            {
                $inc: {
                    // and add the fucking balance what are you confused about
                    balance: - amount
                }

            })
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

    async isBanned(id) {

        const userData = await this.fetchData(id)
        console.log(userData)

        if (userData === null || userData === undefined) {

            return false;
        }
        else {
            return userData.isBanned
        }
    }

    async setBan(id) {

        const userData = await this.fetchData(id)

        if (userData === null || userData === undefined) {
            return false
        }

        else {
            let setUserBan = await User.findOneAndUpdate({ userID: id }, {
                isBanned: !userData.isBanned
            })
            console.log(setUserBan)
        }
    }
}
