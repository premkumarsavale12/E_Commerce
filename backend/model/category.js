const mongoose = require("mongoose")

const Category = new mongoose.Schema({

    Image: {
        type: String
    },

    Text: {
        type: String
    }
})


module.exports = mongoose.model("Category", Category);
