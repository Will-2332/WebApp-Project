const db = require("../models/db");
require('dotenv').config('path = ./..');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
salt = process.env.SALT;

function validPassword(req, hash) {
    var hashVerify = crypto.pbkdf2Sync(req.body.pw, salt, 1000, 60, 'sha512').toString();
    return hash == hashVerify;
}
function genPassword(req) {
    var genhash = crypto.pbkdf2Sync(req.body.pw, salt, 1000, 60, 'sha512').toString();
    return genhash
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
    console.log('req.body.uname=', req.body.uname);
    uanme = req.body.uname

    db.query('SELECT * FROM acc_users WHERE username = ?', uname,
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

module.exports = validPassword;
module.exports = genPassword;
module.exports = isAuth;
module.exports = isAdmin;
module.exports = userExists;