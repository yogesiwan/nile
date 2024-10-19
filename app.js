// Express require

const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();

// Routes Require
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

// Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database require
const db = require("./config/mongoose-connection");

// Set EJS as the templating engine
app.set('view engine', 'ejs');

//  Routers Setup
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});
app.use('/owners', ownersRouter); 
app.use('/products', productsRouter);
app.use('/users', usersRouter);

console.log(process.env.NODE_ENV);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

