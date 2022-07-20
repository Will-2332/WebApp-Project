// external libraries imported
const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");

//  my own scripts imported
const db = require('./models/db');

// .env because I like it
require('dotenv').config();

//  settings ? not sure yet
app.set('view engine', 'ejs');
// app.use('/js', express.static('./public/js'));
// app.use('/css', express.static('./public/css'));
// app.use('/images', express.static('./public/images'));
app.use('/public', express.static('./public'))
// app.use('favicon.ico', express.static('./favicon.ico'));
app.use('/views', path.join('./public'));

// routes
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/search', (req, res) => {
    console.log('works');
    db.query('SELECT * FROM accommodations', (error, results) => {
        res.render('accommodations', { results: results });
    });
});


_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});