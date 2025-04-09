const db = require('../db/queries');

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

module.exports = {
    getHome,
};