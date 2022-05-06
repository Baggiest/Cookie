const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true},
    priceAtPurchase: { type: Number, required: true },
    numberOfShares: { type: Number, default: 0 },
    dateOfPurchase: { type: Number, required: true },
    worthAsset: { type: Number }

});

const userSchema = new mongoose.Schema({

    userID: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    serverID: { type: String, required: false },
    lastReward: { type: Number, default: 1 },

    stock: [stockSchema]
})

module.exports = mongoose.model("Users", userSchema)// a way to deal with someone buying the same share twice within a timespan
    // so basically instead of having to make a new obect we just liquefy the already asset with the priceAtPrice and add it to this
    // and when they sell this part will be added to their returnsD