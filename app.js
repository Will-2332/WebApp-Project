const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");

require('dotenv/config');




_PORT = process.env.PORT || 5500
app.listen(_PORT, () => {
    console.log(`Server is running on port ${_PORT}.`);
});   