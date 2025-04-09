const passport = require('passport');
const db = require('../db/pool');

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

module.exports = {
    getLogin,
    getSignup,
    postLogin,
    handlePostSignup,
    handleLogOut
};