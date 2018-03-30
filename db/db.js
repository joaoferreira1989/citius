const mysql = require('mysql');
const { dbConfig } = require('./db.config');
const connection = mysql.createConnection(dbConfig);

module.exports = {
    connection
};