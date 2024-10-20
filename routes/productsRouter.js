const express = require("express"); // Require Express
const router = express.Router(); // Create a router instance
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

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
    } = req.body;

    // Create product while allowing undefined values for bgcolor, panelcolor, and textcolor
    const product = await productModel.create({
      name,
      price,
      discount,
      bgcolor: bgcolor || undefined, // Use default if not provided
      panelcolor: panelcolor || undefined, // Use default if not provided
      textcolor: textcolor || undefined, // Use default if not provided
      image: req.file.buffer,
    });

    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router; // Export the router