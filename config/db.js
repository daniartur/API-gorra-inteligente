const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'gorra'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;
