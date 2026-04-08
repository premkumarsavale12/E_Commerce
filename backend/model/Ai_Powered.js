
const mongoose = require("mongoose");

const ai_powered = new mongoose.Schema({


    Heading: {
        type: String,
        required: true,
    },

    SubHeading: {
        type: String,
        required: true,

    },

    Paragraph: {
        type: String,
        required: true
    },

    Button: {
        type: String
    },

    Image: {
        type: String,

    },


})

module.exports = mongoose.model("ai_powered",ai_powered)
