const mongoose = require('mongoose');

// Define the User schema
const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    products: {
         type: Array,
         default: []
    },
    orders: {
        type: Array,
        default: []
   }
   ,
   picture: String,
   gstin: String
});

// Create the User model from the schema
const Owner = mongoose.model('owner', ownerSchema);

// Export the User model
module.exports = Owner;