
const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
    Image: {
        type: String,
        required: true,

    }, 
    
    Image_Name: {
        type: String,
        required: true

    },
})
module.exports = mongoose.model("Collection", Collection);
 