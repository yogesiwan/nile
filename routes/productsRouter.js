const express = require("express"); // Require Express
const router = express.Router(); // Create a router instance
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const categoryModel = require("../models/category-model"); // Import the Category Model
const { capitalize } = require("../utils/capitalize");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Destructure from req.body with default values if not provided
    const {
      name,
      price,
      discount = 0, // Optional: Set discount to 0 if not provided
      bgcolor,
      panelcolor,
      textcolor,
      category
    } = req.body;

    // Create product while allowing undefined values for bgcolor, panelcolor, and textcolor
    const product = await productModel.create({
      name,
      price,
      discount,
      bgcolor: bgcolor || undefined, // Use default if not provided
      panelcolor: panelcolor || undefined, // Use default if not provided
      textcolor: textcolor || undefined, // Use default if not provided
      image: req.file ? req.file.buffer : undefined, // Handle missing image gracefully
    });

    // Check if the category already exists, if not create a new one
    let categoryMod = await categoryModel.findOne({ catname: category });
    if (!categoryMod) {
      let categoryy;
      categoryy  = capitalize(category);
      // console.log(categoryy);
      categoryMod = await categoryModel.create({
        catname: categoryy
      });
    }

    // Add the product to the category's products array
    categoryMod.products.push(product._id);
    await categoryMod.save();

    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    console.error(err); // Log the error for debugging
    req.flash("error", "An error occurred while creating the product");
    res.redirect("/owners/admin");
  }
});

module.exports = router; // Export the router