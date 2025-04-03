const {body, validationResult, check} = require('express-validator');
const db = require('../db/queries');
const passport = require('passport');

function getHome(req, res) {
    res.render('index', { title: 'Home', 
        user: req.user || req.session.user  
    });
}

function getLogin(req, res) {
    res.render('login', { title: 'Login' });
}

function getSignup(req, res) {
    res.render('signup', { title: 'Sign Up' });
}

function postLogin(req, res, next) {
    const {username, password} = req.body;
    
    console.log("Received login request:", username, password);
    
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            console.error('Error during authentication:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        if(!user) {
            console.error('User not found or incorrect password:', username);
            return res.status(401).send('Unauthorized');
        }
        
        req.logIn(user, function(err) {
            if (err) { 
                console.error('Error during login:', err);
                return next(err); 
            }
            
            req.session.user = user;
            return res.redirect('/');
        });
    })(req, res, next); 
}

async function handlePostSignup(req, res) {

    const {username, password} = req.body;
    console.log("Received signup request:", username, password); // ✅ Check if request data is received

    try {
        await db.signUserUp(username, password)
        res.redirect('/');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Internal Server Error');
    }
}

function handleLogOut(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports = {
    getHome
    , getLogin
    , getSignup
    , postLogin
    , handlePostSignup,
    handleLogOut
};