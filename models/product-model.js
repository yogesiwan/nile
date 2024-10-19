const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     image: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    discount:{
        type: Nmber,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

// Create the User model from the schema
const Product = mongoose.model('product', productSchema);

// Export the User model
module.exports = Product;