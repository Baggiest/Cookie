/* eslint-disable no-unused-vars */

const Handler = require("../mongo/handler")
const Stock = require('../api/stocks')

const caller = "pricing CMD"

const handler = new Handler(caller)
const stock = new Stock()

module.exports = {

    name: "price",
    description: "for getting stock prices!",

    async execute(message) {

        const mString = message.content;
        const mSplit = mString.split(' ') // cool kills call it args, args more like kys lmfao
        const pickedStock = mSplit[2].toUpperCase()
        //await handler.userValidate(message, caller)

        let stockPrice = await stock.getStocksPrice(pickedStock)

        if (stockPrice) {  
            //message.reply('enter a valid stock symbol mf')
            message.reply(`its priced at ${await Math.floor(stockPrice / 10)} cookies !`)
        }
        else {
            message.reply(`enter a valid stock symbol`)
        }


        console.log("cuck", stockPrice)
        // console.log(stockPrice['Global Quote']['05. price'])
    }
}

