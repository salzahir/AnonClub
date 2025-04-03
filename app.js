const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

const routes = require('./routes/routes');
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
                                                                                                                                                                                                                                                                                                                                                                                                       