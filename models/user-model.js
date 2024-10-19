const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    cart: {
         type: Array,
         default: []
    },
    orders: {
        type: Array,
        default: []
   }
   ,
   picture: String,
   contact: String
});

// Create the User model from the schema
const User = mongoose.model('user', userSchema);

// Export the User model
module.exports = User;