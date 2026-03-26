const mongoose = require("mongoose");

const Section_2 = new mongoose.Schema({

    Image: {
        type: String,
    
    },


    Heading: {
        type: String,

    },

    Sub_Heading: {
        type: String,

    },

    Description: {
        type: String,

    },
    Sub_Description: {
        type: String,

    },

    Button: {
        type: String,

    },



})

module.exports = mongoose.model("Section_2", Section_2);
