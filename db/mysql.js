const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "rpgdb",
    multipleStatements: true
});

module.exports = db;