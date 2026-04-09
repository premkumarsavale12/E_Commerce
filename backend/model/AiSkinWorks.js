const mongoose = require("mongoose");

const aiSkinWorksSchema = new mongoose.Schema({
    Heading: {
        type: String,
        required: true,
    },
    SubHeading: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Concerns: [
        {
            name: { type: String, required: true },
            beforeImage: { type: String, required: true },
            afterImage: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model("Ai_Skin_Works", aiSkinWorksSchema);
