/* eslint-disable no-unused-vars */

const Handler = require("../mongo/handler")
const Stock = require('../api/stocks')

const caller = "buying stock CMD"

const handler = new Handler(caller)
const stock = new Stock()

module.exports = {

    name: "buy",
    description: "for buying stocks",

    async execute(message) {

        //sample input "hey buy TSLA 3"

        const mID = message.author.id;

        const mString = message.content;
        const mSplit = mString.split(' ') // cool kills call it args, args more like kys lmfao

        const amount = mSplit[3];
        const amountOfStock = Math.floor(amount)

        let pickedStock = mSplit[2]; // why is js so much of a pussy when it comes to toUpperCase and lowercase holy shit

        console.log(mSplit)

        if (typeof (pickedStock) === 'string') {
            pickedStock = pickedStock.toUpperCase()
        }
        else {
            return false;
        }

        if (stock.isValidSymbol(pickedStock) === true && amountOfStock > 0) {

            stock.buyStock(mID, pickedStock, amountOfStock, message)
            //stock.hasStock(mID, 'AAPL')
            console.log(`trying to buy ${pickedStock}`)
        }

        else {
            message.reply(`enter a valid amount and symbol`)
        }
    }
}
