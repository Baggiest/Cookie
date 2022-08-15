const Handler = require("../mongo/handler")
const handler = new Handler("bank")

module.exports = {
    name: 'bank',
    description: 'bank stuff',

    async execute(m) {
        let mString = m.content
        let bankID = "000000000000000000"
        let mArray = mString.split(" ")
        let userID = m.author.id

        let command = mArray[2]
        const amount = Number(mArray[3])


        const userData = await handler.fetchData(userID)
        const userBalance = userData.balance


        if (command === "tax") {

            console.log("correct")

            if (isNaN(amount)) {
                m.reply('not a number lmfao')
                return false
            }
            else if (amount < 0){
                m.reply("kill yourself dipshit")
                return false;
            }

            else if (amount > userBalance) {
                m.reply("not enough balance")
                return false
            }

            else {
                handler.payUser(userID, bankID, amount, m).then(() => {
                    m.reply(`**You have paid the Government of Pepeja ${amount} cookies!** <:Cookie:970644679353831424> \n*Please contact a cookie comrade to get confirmed...*`)
                })
            }
        }
    },
};
