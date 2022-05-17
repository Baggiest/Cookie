const symbolDB = require('../symbols.json')
const Handler = require('../mongo/handler')

const request = require('request');
const config = require('../config.json');
const User = require('../mongo/users');
const caller = "stock handler"

const handler = new Handler(caller)

const emotes = {
    "cookie": "<:Cookie:970644679353831424>"
}
module.exports = class Stock {

    constructor() {

    }


    async hasStock(id, symbol) {

        let i;
        const userData = await handler.fetchData(id)

        //console.log("bruh", userData)
        const stockArray = userData.stock;

        // console.log("cuck", userData.stock)

        for (i = 0; i < stockArray.length; i++) {

            console.log(stockArray[i].name)

            // if (stockArray[i].name.includes(symbol)) {

            //     return true
                
            // }

            // else {
            //     return false
            // }
        }
    }



    isValidSymbol(symbol) {

        let hasValue = JSON.stringify(symbolDB).includes(symbol)

        return (hasValue ? true : false)
    }



    async getStocksPrice(symbol) {

        var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${config.stockAPIkey}`;
        // console.log(url)
        // console.log(this.isValidSymbol(symbol))

        if (this.isValidSymbol(symbol)) {

            return new Promise((resolve) => {
                request.get(
                    {
                        url: url,
                        json: true,
                        headers: { "User-Agent": "request" },
                    },

                    (err, res, data) => {

                        if (err) {
                            console.log("Error:", err);
                        }

                        else if (res.statusCode !== 200) {
                            console.log("Status:", res.statusCode);
                        }

                        else {
                            // data is successfully parsed as a JSON object:
                            //console.log(data);
                            try {
                                resolve(data["Global Quote"]["05. price"]);
                            } catch {
                                return undefined;
                            }
                        }
                    }
                );
            });
        }

        else {
            return false
        }
    }

    async buyStock(id, symbol, amount, message) {

        // const userData = await handler.fetchData(id)
        // const userBalance = userData.balance;

        // console.log(`user balance is ${userBalance}`)

        // const stockPriceOfOne = Math.floor(await this.getStocksPrice(symbol) / 10) //for my economy i just put a divide by ten cause it would be too expensive
        // const finalStockPrice = stockPriceOfOne * amount

        // if (finalStockPrice >= userBalance) {

        //     return false;

        // }

        // else {
        //     console.log(`bought ${amount} shares of ${symbol} for ${finalStockPrice} cookies`)

        //     message.reply(`bought ${amount} shares of ${symbol} for ${finalStockPrice} ${emotes.cookie}`)
        //     handler.decBal(id, finalStockPrice)

        //         .then(async () => {

        //             await this.giveShare(id, symbol, amount, finalStockPrice)
        //             console.log(id, symbol, amount, finalStockPrice)

        //             return true
        //         })
        // } 
        this.hasStock(id)
    }

    async giveShare(id, symbol, count, paidFeeOfOne) {

        const stake = [{
            name: symbol,
            priceAtPurchase: paidFeeOfOne,
            numberOfShares: count,
            dateOfPurchase: Date.now()
        }]

        //console.log(stake)

        //now we check if the user already owns the stock, yes i did write a function for it

        if (this.hasStock(symbol) === true) {
            User.findByIdAndUpdate({}, {
                $inc: {
                    stock: {
                        numberOfShares: + count
                    }
                }
            })

        } else {

            let userNewStock = await User.findOneAndUpdate({ userID: id }, {
                $push: { stock: stake },
            })
        }




        //console.log(userNewStock)
    }
}

