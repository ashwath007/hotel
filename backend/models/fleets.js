const mongoose = require("mongoose");



const fleetSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true

    },
    fid: {
        type: String
    },
    status: String,
    orders: []

}, { timestamps: true })


module.exports = mongoose.model("Fleets", fleetSchema)