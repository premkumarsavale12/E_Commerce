


const mongoose = require("mongoose");

const Faq = new mongoose.Schema({

    Heading: {

        type: String,
        required: true,


    },

    Paragraph: {
        type: String,
        required: true

    }


})

module.exports = mongoose.model("Faq", Faq);
