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
const searchRouter = require('./routes/search');

// .env because I like it
require('dotenv').config();

//  settings ? not sure yet
app.set('views', path);
app.set('view engine', 'ejs');
app.use('/js', express.static('./public/js'));
app.use('/css', express.static('./public/css'));
app.use('/images', express.static('./public/images'));
app.use('/public', express.static('./public'))
app.use('favicon.ico', express.static('./favicon.ico'));
app.use('views', path.join('./public'));

// routes?
app.use('/search', searchRouter);
app.get('/', (req,res) => {
    res.render('./public/home')
})


_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});