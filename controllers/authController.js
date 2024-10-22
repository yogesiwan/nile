const userModel = require("../models/user-model");
const bcryptjs = require('bcryptjs');
const { generateToken } = require("../utils/generateToken");
module.exports.registerUser =  async function (req, res) { // Correct order of parameters
    try {
        const { email, password, fullname } =  req.body;

        let already = await userModel.findOne({email:email});
        if(already) {
            // console.log(already);
            req.flash("error", "Email already registered.");
            return res.redirect("/");
        }
           
        // Hash the password using await
        const saltRounds = 10;
        const hash =  await bcryptjs.hash(password, saltRounds);

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

     req.flash("success", "Account created successfully.");
     res.redirect("/shop");
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.loginUser = async function (req, res) {
    const { password, email } = req.body;

    
    // console.log(password);
    // console.log(email);

    // Find the user by email
    let user = await userModel.findOne({ email: email });
    
    // Check if user exists
    if (!user) {
        req.flash("error", 'Invalid Email or Password');
        return res.redirect('/'); // Redirect with an error message
    }

    // Compare password with hashed password
    bcryptjs.compare(password, user.password, function (err, result) {
        if (err) {
            // Handle error during password comparison
            req.flash("error", 'Something went wrong, please try again.');
            return res.redirect('/'); // Redirect with an error message
        }

        if (result) {
            // Password matched, generate token and set cookie
            let token = generateToken(user);
            res.cookie("token", token); 
            req.flash("success", `Welcome ${user.fullname}`);
            return res.redirect("/shop");
        } else {
            // Password did not match
            req.flash("error", 'Invalid Email or Password');
            return res.redirect('/'); // Redirect with an error message
        }
    });
};

module.exports.logout = async function (req, res) {

    req.flash("success", "Logged Out");
    // console.log("Before clearing cookie:", req.cookies.token); // Log cookie before clearing
    res.clearCookie("token");
    // console.log("After clearing cookie:", req.cookies.token); // Log cookie after clearing
    res.redirect("/");
};

