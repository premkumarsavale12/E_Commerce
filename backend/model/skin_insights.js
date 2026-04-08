
const mongoose = require('mongoose');

const skin_insights = new mongoose.Schema({

    Image: {

        type: String,

    },

    Heading: {

        type: String,
        required: true,

    },

    Description: {

        type: String,
        required: true,

    },

    Button: {

        type: String,
        required: true,
        

    },

    Paragraph: {

        type: String,
        required: true,
    },

})


module.exports = mongoose.model("skin_insights", skin_insights); 