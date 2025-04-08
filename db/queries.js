const passport = require('passport');
const db = require('./pool');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use(

    new LocalStrategy(async (username, password, done) => {

        try {
            const {rows} = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            user = rows[0];
        
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password." });
            }

        } catch (error) {
            return done(error);
        }

    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = rows[0];
        done(null, user);
    } catch (error) {
        done(error);
    }
});

async function signUserUp(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
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

        console.log('Messages retrieved:', rows);  
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

module.exports = {
    signUserUp,
    getMessages,
    deleteMessage,
    addMessage
};
