const db = require('../models/db')

class Users {
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
    findUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ${this.table} WHERE ID = ?`, [id], (err, results, fields) => {
                if (err) {
                    reject(err);
                } else if (results.length == 0) {
                    resolve(null);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    findUsersByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ${this.table} WHERE username =?`, [username], (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }

}

module.exports = Users;