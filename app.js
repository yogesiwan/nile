// Express require
const express = require('express');
require("dotenv").config();
const PORT = process.env.PORT || 6010;

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash  = require("connect-flash");

// Routes Require
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter  = require("./routes/indexRouter");

// Database require
const db = require("./config/mongoose-connection");

// Setups
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());


// Set EJS as the templating engine
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


//  Routers Setup
app.use('/', indexRouter);

// Keep-alive endpoint
app.get("/keep-alive", (req, res) => {
    res.status(200).send("Server is active");
});

setInterval(async () => {
    try {
        const response = await fetch("https://nile-ezvi.onrender.com/keep-alive", {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error(`Server response: ${response.status}`);
        }
        
    } catch (error) {
        console.error("Keep-alive request failed:", error.message);
    }
}, 10 * 60 * 1000); // Every 10 minutes
   
app.use('/owners', ownersRouter); 
app.use('/products', productsRouter);
app.use('/users', usersRouter);


// Start the server
app.listen(PORT, () => {
    // console.log(`Server is running on ${PORT}`);
});

