const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 3000;
const session = require("express-session");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Passport configuration
const passport = require('passport');
require('./db/passport-config')(passport); 

app.use(passport.initialize());
app.use(passport.session());

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files CSS styling
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Importing the routes
const authRoutes = require('./routes/authroutes'); 
const messageRoutes = require('./routes/messageroutes');
const homeRoutes = require('./routes/homeroute'); 

// Use the routes
app.use('/', homeRoutes); 
app.use('/', authRoutes); 
app.use('/', messageRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
                                                                                                                                                                                                                                                                                                                                                                                                       