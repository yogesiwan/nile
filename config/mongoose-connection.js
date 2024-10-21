require('dotenv').config();

const mongoose = require('mongoose');

// Use process.env to get the MongoDB URI
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

module.exports = mongoose.connection;