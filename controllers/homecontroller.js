const db = require('../db/queries');
const {getRoleGreeting} = require('../utils/greeting');

async function getHome(req, res) {
    try {
        const messages = await db.getMessages();
        const user = req.user || req.session.user || null;
        const role = getRoleGreeting(user)
        res.render('index', { title: 'Home', 
            user: user,
            role: role,
            message: null,
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