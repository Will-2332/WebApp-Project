const passport = require("passport");
salt = process.env.SALT;
const isValid = require('../middleware/login');
const LocalStrategy=require('passport-local').Strategy;



const customFields = {
    usernameField: 'uname',
    passwordField: 'password',
};

const verifyCallback = (username, pw, done) => {
    db.query('SELECT * FROM acc_users WHERE username = ?', [username], function (error, results, fields) {
        if (error) 
            return (error);
        if (results.length = 0) {
            return done(null, false);
        }
        isValid = validPassword(pw, results[0]);
        user = { id: results[0].id, username: results[0].username, pw: results[0].password};
        if (isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('Serializing');
    done(null, user.id)
});

passport.deserializeUser(function (userId, done) {
    console.log('deserializing' + userId);
    db.query('SELECT * FROM acc_users WHERE id = ?', [userId], function (error, results) {
        done(null, results[0]);
    });
});

exports.module = customFields;
exports.module = verifyCallback;
exports.module = strategy;
