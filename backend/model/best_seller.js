
const mongoose = require("mongoose");

const best_seller = new mongoose.Schema({

    Heading: {
        type: String
    },

    Paragraph: {
        type: String,

    },

    Image: {
        type: String,

    },

    Image_Name: {
        type: String,

    },
    Image_Description: {
        type: String,

    },

    Price: {
        type: String
    },
    Button: {
        type: String
    }

});
module.exports = mongoose.model("best_seller", best_seller)