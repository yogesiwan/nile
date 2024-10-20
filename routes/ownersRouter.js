const express = require('express'); // Require Express
const router = express.Router(); // Create a router instance
const ownerModel = require("../models/owner-model");


router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

if(process.env.NODE_ENV==="development"){

    router.post('/create', async(req, res) => {
        let {fullname,email,password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
}

router.get("/admin", function(req,res){
       let success = req.flash("success");
       res.render("createproducts", { success });
})



module.exports = router; // Export the router