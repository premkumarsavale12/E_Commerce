const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({

    company: {
        title: String,
        links: [
            {
                name: String,
                url: String
            }
        ]
    },

    quickLinks: {
        title: String,
        links: [
            {
                name: String,
                url: String
            }
        ]
    },

    contact: {
        title: String,
        description: String,
        email: String,
        supportText: String,
        supportEmail: String
    },

    social: [
        {
            name: String,
            url: String
        }
    ]

})

module.exports = mongoose.model("Footer", footerSchema)