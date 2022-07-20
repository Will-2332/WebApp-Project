const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const db = require('./models/db');
const accommodation = require('./controllers/accommodation');


require('dotenv').config();


app.set('views', path)

db.connect(err => {
    if (err) {
        console.log('Connection failed to database: ${err}');
        process.exit(1);
    } else {
        console.log('Connection sucessful!');
    };
});



_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});