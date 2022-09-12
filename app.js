// external libraries imported
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
var urlencodedParser = require('urlencoded-parser')
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(expressSession);

//  my own scripts imported
const db = require('./models/db');
const sessionStore = new MySQLStore({}, db.promise());


// exports

// .env because I like it
require('dotenv').config();

//   settings ? not sure yet

const app = express();
app.use(expressSession({
    store: sessionStore,
    secret: 'Petrichor',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 600000,
        httpOnly: false
    }
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
const path = require("path");
app.use('/js', express.static(__dirname + '/views/js'));
app.use('views', express.static(__dirname + '/views'));
const { json, urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// const verifyCallback = (username, password, done) => {

//     db.query('SELECT * FROM acc_users WHERE username = ? ', [username], function (error, results, fields) {
//         if (error)
//             return done(error);

//         if (results.length == 0) {
//             return done(null, false);
//         }
//         const isValid = validPassword(password, results[0].username);
//         user = { id: results[0].id, username: results[0].username };
//         if (isValid) {
//             return true, done(null, user);
//         }
//         else {
//             return done(null, false);
//         }
//     });
// }

passport.use(new LocalStrategy(async (username, password, done) => {
    db.query('SELECT * FROM acc_users WHERE username=?',
        [username],
        (err, results, fields) => {
            const user1 = results[0]
            if (username != user1.username) {
                return done(null, false, console.log('Invalid User'));
            }
            if (password != user1.password) {
                return done(null, false, consolge.log('Invalid Password'));
            }
            if (err) {
                return done(err, console.log('Error, something went wrong'))
            }
            else {
                console.log('Valid User ' + username);
                const user = [
                    ID = user1.ID,
                    username = user1.username,
                    password = user1.password,
                    admin = user1.admin
                ]
                return done(null, user);
            }
        });
}));

passport.serializeUser(function (user, done) {
    console.log('Serializing Id =' + user[0])
    done(null, user);
});

passport.deserializeUser(async function (userId, done) {
    console.log('deserializer Id=' + userId[0])
    db.query('SELECT * FROM acc_users WHERE ID=?',
        [userId[0]],
        (err, results, fields) => {
            const users = results[0];
            done(null, userId);
        })

});

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json('Unauthorized acess');
    }
}


function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin == 1) {
        next();
    }
    else {
        res.redirect('/notAuthorizedAdmin');
    }
}
// routes
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/search', (req, res) => {
    res.render('search')
});


app.get('/accommodation/all', async (req, res) => {
    db.query('SELECT * FROM accommodation',
        [req.params.search],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});


app.get('/location/:location', async (req, res) => {
    db.query('SELECT * FROM accommodation WHERE location=?',
        [req.params.location],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});

app.get('/type/:type', async (req, res) => {
    db.query('SELECT * FROM accommodation WHERE type=?',
        [req.params.type],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});

app.get('/location/:location/type/:type', async (req, res) => {
    db.query('SELECT * FROM accommodation WHERE location=? AND type=?',
        [req.params.location, req.params.type],
        (err, results, fields) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});

app.post('/book/', urlencodedParser,isAuth, async (req, res) => {
    console.log(req.body);
    db.query('UPDATE acc_dates SET availability =  availability - ' + req.body.npeople + ' WHERE id=' + req.body.ID + '',
        (error, results, fields) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Availability updated');

                res.json({ sucess: 1 });
            }
        })
    db.query('INSERT INTO acc_bookings(accID,npeople,thedate) VALUES(' + req.body.accID + ',' + req.body.npeople + ',' + req.body.thedate + ')',
        (error, results, fields) => {
            if (error) {
                db.query('UPDATE acc_dates SET availability =  availability + ' + req.body.npeople + ' WHERE id=' + req.body.ID + '',
                    (error, results, fields) => {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log('Availability updated');

                            res.json({ sucess: 1 });
                        }
                    })

                console.log(error)
            } else {
                console.log('Reservation made!');
            }
        })

});

// Login route
app.get('/login', (req, res, next) => {
    res.render('login')
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

//Logout route

_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});