
const mysql = require('mysql2');
const db = require('./models/db.js');


require
// function to search all accomodations
function search_all_accomodations() {
    db.query(
        'SELECT * FROM accommodation',
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )
};

function search_accomodations() {

};
module.exports = accomodation;