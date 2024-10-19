const express = require('express'); // Require Express
const router = express.Router(); // Create a router instance
const {registerUser} = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send('Welcome to the Home Page!');
});

router.post("/register", registerUser);


module.exports = router;