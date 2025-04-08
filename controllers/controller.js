const {body, validationResult, check} = require('express-validator');
const db = require('../db/queries');
const passport = require('passport');

async function getHome(req, res) {
    try {
        const messages = await db.getMessages();
        res.render('index', { title: 'Home', 
            user: req.user || req.session.user,
            messages: messages,
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
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
    console.log("Received signup request:", username, password); 
    try {
        await db.signUserUp(username, password)
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

async function handleDeleteMessage(req, res) {
    const messageId = req.params.id;
    try {
        const deleted = await db.deleteMessage(messageId);
        if (!deleted) {
            return res.status(404).send('Message not found');
        }
        console.log('Message deleted:', deleted);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function handleNewMessage(req, res) {
    
    if (!req.isAuthenticated() || !req.user) {
        return res.status(401).send('Unauthorized - Please log in first');
    }
    const userName = req.user.username;

    const {message} = req.body;
    console.log("Received new message request:", userName, message);
    try {
        await db.addMessage(userName, message);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding new message:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getHome
    , getLogin
    , getSignup
    , postLogin
    , handlePostSignup,
    handleLogOut,
    handleDeleteMessage,
    handleNewMessage
};