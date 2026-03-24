
const mongoose = require("mongoose");


const SellerProduct = new mongoose.Schema({


    Image: {
        type: String,
        required: true
    },

    Image_Name: {
        type: String,
        required: true

    },

    Image_Description: {
        type: String,
        required: true

    },

    price: {
        type: String,
        required: true

    }

})

module.exports = mongoose.model("Seller", SellerProduct);

