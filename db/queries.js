const passport = require('passport');
const db = require('./pool');
const bcrypt = require('bcrypt');

async function checkSignIn(username, password, done) {

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
}

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

module.exports = {
    checkSignIn,
    signUserUp
};
