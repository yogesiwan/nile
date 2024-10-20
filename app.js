// Express require
const express = require('express');
require("dotenv").config();

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
   
app.use('/owners', ownersRouter); 
app.use('/products', productsRouter);
app.use('/users', usersRouter);
const PORT = process.env.PORT || 3000;


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

