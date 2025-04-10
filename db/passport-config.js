const bcrypt = require('bcrypt');
const db  = require('./pool');
const LocalStrategy = require('passport-local').Strategy;

function configurePassport(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
                const user = rows[0];
            
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
    );

    passport.serializeUser((user, done) => {

        if (!user) {
            console.error('User object is undefined during serialization.');
            return done(new Error('User object not found during serialization.'));
        }
    
        if (!user.id) {
            return done(new Error('User ID is missing during serialization.'));
        }
    
        done(null, user.id);  // Serialize user by its ID
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

    return passport;
}

module.exports = configurePassport;