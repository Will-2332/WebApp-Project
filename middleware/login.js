const db = require("../models/db");
require('dotenv').config('path = ./..');
process.env.SALT = salt;

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2sync(password, salt, 1000, 60, 'sha512').toString(hex);
    return hash == hashVerify;
}
function genPassword(password) {
    var genhash = crypto.pbkdf2sync(password, salt, 1000, 60, 'sha512').toString('hex');
    return { salt: salt, hashedPassword: genhash };
}
function isAuth(req, res, next) {
    if (req.isAuthenticaded()) {
        next();
    }
    else {
        res.redirect('/notAuthorized');
    }

}

function isAdmin(req, res, next) {
    if (req.isAuthenticaded() && req.user.isAdmin == 1) {
        next();
    }
    else {
        res.redirect('/notadm');
    }
}

function userExists(req, res, next) {
    db.query('SELECT * FROM acc_users WHERE username = ?', [req.body.uname],
        function (error, results, fields) {
            if (error) {
                console.log('User not found');
            }
            else if (results.length > 0) {
                res.redirect('/userAlready Exists')
            }
            else {
                next();
            }
        })
}

module.exports = userExists;
module.exports = isAdmin;
module.exports = isAuth;
module.exports = genPassword;
module.exports = validPassword;