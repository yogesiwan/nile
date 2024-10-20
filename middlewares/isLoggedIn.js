const userModel = require("../models/user-model");
const jwt = require('jsonwebtoken');


module.exports = async function (req, res, next){
    console.log(req.cookies.token);
    if(!req.cookies.token){
        req.flash("error", "You need to login first");
        console.log(req.cookies.token);
        return res.redirect("/");
    }
    try{
          let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
          let user = await userModel.findOne(({email: decoded.email})).select("-password");
          req.user = user;
          next();
    }
    catch(err){
        req.flash("error", "something went wrong");
        res.redirect("/");
    }
   
}