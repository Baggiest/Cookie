const Handler = require("./mongo/handler");
const caller = "lottary"
/* eslint-disable no-unused-vars */
const handler = new Handler(caller)
const emotes = {
    "cookie": "<:Cookie:970644679353831424>"
}

module.exports = async (m) => {

    //this module is called from index.js at the the function at ~83

    let userID = m.author.id

    getsPrize()

    function getsPrize() {

        let r = Math.floor(Math.random() * 100) + 1;
        //generates a number between 1 & 100
        console.log(r)

        switch(true){
            
            case (r >= 93):
            
            //wins amounts of cookies that should be decided in the other function
            m.reply(`YOU WON ${howMuchPrize()} COOKIES ${emotes.cookie} !`).then(()=>{
                //now we tell it to mongo
                //handler.pay
            })

        }
    }

    function howMuchPrize(){

        // u get 1 to 10 cookies, all up to chance
        let r = Math.floor(Math.random() * 10) + 1;
        return r;
    }
}