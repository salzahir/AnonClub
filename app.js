// app.js
const express = require('express');
const path = require('path');

const app = express();

// Configuration
require('dotenv').config();

// Middleware

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
const session = require("express-session");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

// Session configuration

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(csurf({cookie: true}));

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

module.exports = app;                                                                                                                                                                                                                                                                                                                                                  