
const mongoose = require('mongoose');

const Hero_Section = new mongoose.Schema({

    Image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Hero", Hero_Section);
