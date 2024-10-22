const express = require('express'); 
const router = express.Router(); 
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const cookieParser = require("cookie-parser");
const categoryModel = require("../models/category-model");

const app = express();
app.use(cookieParser());


// Home route
router.get("/", function (req, res) {
    let success = req.flash("success");
    let error = req.flash("error");
    // console.log(req.cookies.token);
    res.render("index", { error, loggedin: false , success});
});


router.get("/shop", async (req, res) => {
    try {
        let categoryName = req.query.category; 
        let discounted = req.query.discounted;
        let products;
        let categories;
        let success;

        if(discounted)
        {
            products = await productModel.find();
            
        }
        if (categoryName){

            const category = await categoryModel.findOne({ catname: categoryName }).populate('products');

                    products =  category.products ;
                    categories = await categoryModel.find();
        } 
        else {      
                    categoryName = "All";
                    products = await productModel.find();
                    categories = await categoryModel.find();
            }

            success = req.flash("success");
            res.render("shop", { products, success, categories, categoryName });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        req.flash("error", "Unable to fetch products.");
        res.redirect("/");
    }
});


// Add to Cart route
router.get("/addtocart/:productid", isLoggedin, async function (req, res) {
    try {
        
        let user = req.user;
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Added to cart");
        const referer = req.get('referer') || '/shop'; 
        res.redirect(referer);
    } catch (error) {
        console.error("Error adding product to cart:", error);
        req.flash("error", "Unable to add product to cart.");
        res.redirect("/shop");
    }
});

// Remove from Cart route

router.get("/removefromcart/:productid", isLoggedin, async function (req, res) {
    try {
        const userId = req.user._id; 
        const productId = req.params.productid;

        let user = await userModel.findById(userId);

        
        const index = user.cart.indexOf(productId);

        if (index > -1) {
            user.cart.splice(index, 1); 
            await user.save(); 
        }

        req.flash("success", "Removed the item from cart"); 
        res.redirect("/cart"); 
    } catch (error) {
        console.error("Error removing product from cart:", error);
        req.flash("error", "Unable to remove product from cart.");
        res.redirect("/cart");
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
        let success = req.flash("success");

        res.render("cart", { cart: Object.values(aggregatedCart), success });
    } catch (error) {
        console.error("Error in fetching cart data:", error);
        req.flash("error", "Unable to fetch cart.");
        res.redirect("/shop");
    }
});

module.exports = router; 