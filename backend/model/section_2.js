const mongoose = require("mongoose");

const Section_2 = new mongoose.Schema({

    Image: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Section_2", Section_2);
