/* eslint-disable no-unused-vars */
const Handler = require("./mongo/handler");
const caller = "lottery"
const handler = new Handler(caller)
const emotes = {
    "cookie": "<:Cookie:970644679353831424>"
}

module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83

    let userID = m.author.id

    function prizeAmount() {

        let p = Math.floor(Math.random() * 10) + 1;
        console.log(`giving the mf ${p}`)
        return p;

    }

    getsPrize() // no subroutines??? megamind face

    function getsPrize() {

        let r = Math.floor(Math.random() * 100) + 1;
        //generates a number between 1 & 100
        console.log(r)

        if (r >= 95) {
            //wins amounts of cookies that should be decided in the other function
            const num = prizeAmount()
            m.reply(`YOU WON ${num} COOKIES ${emotes.cookie} !`).then(() => {

                handler.addBal(userID, num)
            })
        }
    }
}