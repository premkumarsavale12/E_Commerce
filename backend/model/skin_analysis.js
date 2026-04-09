
const mongoose = require("mongoose");


const skin_analysis = new mongoose.Schema({

    Image: {
        type: String,

    },

    Heading: {
        type: String,
        required: true
    },


    Paragraph: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model("skin_analysis", skin_analysis);
