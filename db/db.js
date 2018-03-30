const mysql = require('mysql');
const { dbConfig } = require('./db.config');
const pool = mysql.createPool(dbConfig);

module.exports = {
    pool
};