const express = require('express'); // Require Express
const router = express.Router(); // Create a router instance
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());


// Home route
router.get("/", function (req, res) {
    let error = req.flash("error");
    // console.log(req.cookies.token);
    res.render("index", { error, loggedin: false });
});

// Shop route
router.get("/shop", isLoggedin, async function (req, res) {
    try {
        let products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", { products, success });
    } catch (error) {
        console.error("Error fetching products:", error);
        req.flash("error", "Unable to fetch products.");
        res.redirect("/");
    }
});

// Add to Cart route
router.get("/addtocart/:productid", isLoggedin, async function (req, res) {
    try {
        
        let user = req.user; // req.user is set by the isLoggedin middleware
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Added to cart");
        res.redirect("/shop"); // Redirecting to shop after updating the cart
    } catch (error) {
        console.error("Error adding product to cart:", error);
        req.flash("error", "Unable to add product to cart.");
        res.redirect("/shop");
    }
});

router.get("/cart", isLoggedin, async function (req, res) {
    try {
        let user = await userModel.findById(req.user._id).populate('cart'); 
        const aggregatedCart = {};

        user.cart.forEach(item => {
            if (aggregatedCart[item._id]) {
                aggregatedCart[item._id].quantity += 1;
            } else {
                aggregatedCart[item._id] = { ...item.toObject(), quantity: 1 };
            }
        });

        res.render("cart", { cart: Object.values(aggregatedCart) });
    } catch (error) {
        console.error("Error in fetching cart data:", error);
        req.flash("error", "Unable to fetch cart.");
        res.redirect("/shop");
    }
});

module.exports = router; // Export the router