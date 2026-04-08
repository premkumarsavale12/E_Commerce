
const mongoose = require('mongoose');

const baby_care = new mongoose.Schema({

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

    

})


module.exports = mongoose.model("baby_care", baby_care);
 