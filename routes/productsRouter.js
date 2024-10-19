const express = require('express'); // Require Express
const router = express.Router(); // Create a router instance

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});



module.exports = router; // Export the router