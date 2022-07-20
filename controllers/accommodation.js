
const mysql = require('mysql2');
const db = require('./models/db.js');


require
// function to search all accomodations
function searchall_accomodations() {
    db.query(
        'SELECT * FROM accommodation',
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )
};

module.exports = accomodation;