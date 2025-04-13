const db = require('./pool');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signUserUp(username, password, role) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows } = await db.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, role]);
        return rows[0];
    } catch (error) {
        console.error('Error signing up user:', error);
        throw error;
    }
}

async function getMessages() {
    try {
        const { rows } = await db.query('SELECT * FROM messages');
        
        if (rows.length === 0) {
            console.log('No messages found.');
            return [];
        }
        return rows;
    } catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
}

async function deleteMessage(id) {
    try {
        const {rows } = await db.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
}

async function addMessage(username, message) {
    try {
        const {rows} = await db.query('INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING *', [username, message]);
        return rows[0];
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;    
    }
}

async function setMember(username) {

    console.log("Setting member role for user:", username);

    try {
        const { rows } = await db.query('UPDATE users SET role = $1 WHERE username = $2 RETURNING *',['member', username]);
        return rows[0];
    } catch (error) {
        console.error('Error setting member role:', error);
        throw error;
    }
}

module.exports = {
    signUserUp,
    getMessages,
    deleteMessage,
    addMessage,
    setMember
};
