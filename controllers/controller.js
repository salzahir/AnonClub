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
    getHome,
    handleDeleteMessage,
    handleNewMessage
};