const mongoose = require("mongoose");

const New_Launch = new mongoose.Schema({

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

module.exports = mongoose.model("new_launcg", New_Launch);