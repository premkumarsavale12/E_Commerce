const mongoose = require("mongoose")

const Concerns = new mongoose.Schema({

    Image: {
        type: String
    },

    Text: {
        type: String
    }
})


module.exports = mongoose.model("Concerns", Concerns);
