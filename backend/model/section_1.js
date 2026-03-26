const mongoose = require("mongoose");

const Section_1 = new mongoose.Schema({


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

    Image: {
        type: String,

    }

})

module.exports = mongoose.model("Section_1", Section_1);
