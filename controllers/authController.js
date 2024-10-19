const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser =  async function (req, res) { // Correct order of parameters
    try {
        const { email, password, fullname } =  req.body;
        const saltRounds = 10;

        // Hash the password using await
        const hash =  await bcrypt.hash(password, saltRounds);

        // Create the user with the hashed password
        const user = await userModel.create({
            email,
            password: hash,
            fullname,
        });

        // Generate a token for the user
        const token = generateToken(user);

        // Set the token as a cookie
        res.cookie("token", token);

        // Send success response
        res.send('User registered successfully!');
    } catch (err) {
        res.send(err.message);
    }
};