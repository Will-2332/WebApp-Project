// external libraries imported
const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const ejs = require("ejs");

//  my own scripts imported
const db = require('./models/db');

// .env because I like it
require('dotenv').config();

// //   settings ? not sure yet
const path = require("path");
app.use('/static', express.static(path.join(__dirname + './views')));
app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + './views/css'));
app.use('/images', express.static(__dirname + './views/images'));
app.use('/views', express.static(__dirname + './views'))
app.use('favicon.ico', express.static(__dirname + './favicon.ico'));
app.use('/views', express.static(path.join(__dirname + './views')));

// routes
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/search', (req, res) => {
    db.query('SELECT * FROM accommodations', (error, results) => {
        res.render('search', { results: results });
    });
});


_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});