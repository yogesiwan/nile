const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
    catname: {
        type: String,
        required: true, // The name of the category is required
        unique: true // Ensuring the category name is unique
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product' // Reference to the Product model
        }
    ]
});

// Create the Category model from the schema
const Category = mongoose.model('category', categorySchema);

// Export the Category model
module.exports = Category;