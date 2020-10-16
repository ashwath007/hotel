const mongoose = require("mongoose");



const userorderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    productname: [{
        type: Array
    }],

    productprice: [{
        type: Array
    }],
    orderstatus: {
        type: String
    },
    userid: {
        type: String
    },
    total: {
        type: String
    },
    delivered: {
        type: String
    },
    productqty: [{
        type: Array
    }],
}, { timestamps: true })



module.exports = mongoose.model("uorder", userorderSchema);