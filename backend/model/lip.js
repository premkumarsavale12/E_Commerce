
const mongoose = require("mongoose");

const lip  = new mongoose.Schema({

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
module.exports = mongoose.model("lip", lip)