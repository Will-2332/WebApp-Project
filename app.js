// external libraries imported
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
var urlencodedParser = require('urlencoded-parser');
const passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


//  my own scripts imported
const db = require('./models/db.js');





// exports

// .env because I like it
require('dotenv').config();

//   settings ? not sure yet

const app = express();
app.use(session({
    key: 'session_cookie',
    secret: 'secret',
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'cookie_user'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use(express.json());
const path = require("path");
app.use('/js', express.static(__dirname + '/views/js'));
app.use('views', express.static(__dirname + '/views'));
const { json, urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




// routes
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/search', (req, res) => {
    res.render('search')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/test', (req, res) => {
    res.render('test')
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

app.get('/accommodation/locations', async (req, res) => {
    db.query('SELECT * FROM accommodation GROUP BY location',
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

app.post('/book/', urlencodedParser, async (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
>>>>>>> parent of 9613e3d (OK! Parts 1 & 2 Done)
    try {
        db.query('INSERT INTO acc_bookings(accID,npeople,thedate) VALUES(' + req.body.accID + ',' + req.body.npeople + ',' + req.body.thedate + ')',
            (error, results, fields) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    console.log('reservation made!');
                }
            })
        db.query('UPDATE acc_dates SET availability =  availability - ' + req.body.npeople + ' WHERE id=' + req.body.ID + '',
            (error, results, fields) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    console.log('Availability updated');

                    res.json({ sucess: 1 });
                }
            })
    } catch (err) { console.log(err) }
<<<<<<< HEAD
>>>>>>> parent of 9613e3d (OK! Parts 1 & 2 Done)
=======
>>>>>>> parent of 9613e3d (OK! Parts 1 & 2 Done)
});


_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});