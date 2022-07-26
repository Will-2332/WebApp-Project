// external libraries imported
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");

//  my own scripts imported
const db = require('./models/db');

var accommodation = null;

// exports

// .env because I like it
require('dotenv').config();

//   settings ? not sure yet

const app = express();
app.set('view engine', 'ejs');
const path = require("path");
const { json } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/search',(req,res) => {
    res.render('search')
});

app.get('/accommodation/all', (req, res) => {
    db.query('SELECT * FROM accommodation',
        [req.params.search],
        (err, results, fields) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});


app.get('/location/:location', (req, res) => {
    db.query('SELECT * FROM accommodation WHERE location=?',
        [req.params.location],
        (err, results, fields) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});

app.get('/type/:type', (req, res) => {
    db.query('SELECT * FROM accommodation WHERE type=?',
        [req.params.type],
        (err, results, fields) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(accommodation)
            }
        });
});

app.get('/location/:location/type/:type', (req, res) => {
    db.query('SELECT * FROM accommodation WHERE location=? AND type=?',
        [req.params.location, req.params.type],
        (err, results, fields) => {
            if(err) {
                res.status(500).json({error: err});
            } else {
                const accommodation = results;
                res.json(accommodation);
                console.log(db.query);
                console.log(accommodation)
            }
        });
});

_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});