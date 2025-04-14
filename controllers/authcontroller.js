// authcontroller.js

const passport = require('passport');
const db = require('../db/queries');
const { validationResult } = require('express-validator');

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
            console.log('Authentication failed:', info.message);
            res.render('index', { title: 'Home', 
                user: req.user || req.session.user,
                message: user ? null : 'Login Error',
                messages: [],
            });
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.render('signup', {
            title: 'Sign Up',
            message: errorMessages.join(', '),
            messageType: 'error'
        });
    }

    const {username, password} = req.body;
    console.log("Received signup request:", username, password); 
    try {
        await db.signUserUp(username, password, 'user');
        res.redirect('/');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.render('signup', { 
            title: 'Sign Up', 
            message: 'Username already exists. Please choose another one.',
            messageType: 'error'
        });
    }
}

function handleLogOut(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

function getMember(req, res) {
    res.render('member', { title: 'Member Area', message: null });
}

async function handleSetMember(req, res) {

    const user = req.user || req.session.user; 
    const memberPassword = req.body.password;

    console.log("Member password check for user:", user);
    console.log("Received password for member area:", memberPassword);

    if(memberPassword !== "secret") {
        console.log("Incorrect password for user:", user);
        return res.render('member', { title: 'Member Area', message: 'Incorrect password' });
    }

    try {
        await db.setMember(user.username);
        console.log("User role updated to member:", user);
        res.redirect('/member');
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getSignup,
    postLogin,
    handlePostSignup,
    handleLogOut,
    getMember,
    handleSetMember
};