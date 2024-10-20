const express = require('express'); // Require Express
const router = express.Router(); // Create a router instance
const {registerUser, loginUser, logout} = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send('Welcome to the Home Page!');
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
module.exports = router;