const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: {
        type: String,
        required: true // Optional: You can make this required
    },
    price: {
        type: Number,
        required: true // Optional: You can make this required
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        default: "white" // Default value set to white
    },
    panelcolor: {
        type: String,
        default: "#F9F6E9" // Default value set to light cream
    },
    textcolor: {
        type: String,
        default: "black" // Default value set to black
    }
});

// Create the Product model from the schema
const Product = mongoose.model('product', productSchema);

// Export the Product model
module.exports = Product;