const mongoose = require("mongoose");

const Section_1 = new mongoose.Schema({

    Image: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Section_1", Section_1);
