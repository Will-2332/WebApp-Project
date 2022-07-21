const mysql = require('mysql2');
require('dotenv').config('path = ./..');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection(err => {
    if (err) {
        console.log('Connection failed to database:',(err));
        process.exit(1);
    } else {
        console.log('Connection sucessful!');
    };
});

module.exports = db;