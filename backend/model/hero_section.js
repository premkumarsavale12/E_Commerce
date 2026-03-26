
const mongoose = require('mongoose');

const Hero_Section = new mongoose.Schema({

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

module.exports = mongoose.model("Hero", Hero_Section);
