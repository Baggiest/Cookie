// const Handler = require("../mongo/handler")
// const handler = new Handler("bank")

// module.exports = {
//     name: 'bank',
//     description: 'bank stuff',

//     async execute(m) {
//         let mString = m.content
//         let mArray = mString.split(" ")

//         let command = mArray[2]
//         const amount = Number(mArray[3])
//         console.log(amount)

//         const userData = await handler.fetchData(m.author.id)
//         const userBalance = await userData.balance


//         if (command === "tax") {
//             console.log("correct")

//             if (isNaN(amount)){
//                 m.reply('not a number lmfao')
//                 return false
//             }

//             if(amount)
//         }


//         console.log(mArray)
//     },
// };
