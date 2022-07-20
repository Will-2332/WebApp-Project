const express = require('express');
const searchRouter = express.Router();

searchRouter.get('all', (req, res) => {
    db.query(
        'SELECT * FROM accommodation',
        function (err, results, fields) {
            console.log(results);
            console.log(fields);
        }
    )
})

module.exports = searchRouter;