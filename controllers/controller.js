const {body, validationResult} = require('express-validator');
const db = require('../db/queries');

function getHome(req, res) {
    res.render('index', { title: 'Home', user: null }); // Merge both into one object
}

function getLogin(req, res) {
    res.render('login', { title: 'Login' });
}

function getSignup(req, res) {
    res.render('signup', { title: 'Sign Up' });
}

function postLogin(req, res) {
    const {username, password} = req.body;

    db.checkSignIn(username, password, (err, user) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        req.session.user = user;
        res.redirect('/');
    });
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

module.exports = {
    getHome
    , getLogin
    , getSignup
    , postLogin
    , handlePostSignup
};