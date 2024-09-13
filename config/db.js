const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');

    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            userid INT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            coin INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createTokensTableQuery = `
        CREATE TABLE IF NOT EXISTS tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            token TEXT NOT NULL,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

        const createServicesTableQuery = `
        CREATE TABLE IF NOT EXISTS services (
            id INT AUTO_INCREMENT PRIMARY KEY,
            expiresId INT NOT NULL,
            service_id VARCHAR(255) NOT NULL,
            service_type VARCHAR(255) NOT NULL,
            userid INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        )
        `;
        const createTranzactionsTableQuery = `
        CREATE TABLE IF NOT EXISTS tranzactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            tranzaction_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        )
        `;

    db.query(createTranzactionsTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating Tranzactions table:', err);
            return;
        }
        console.log('Tranzactions table ready');
    });

    db.query(createServicesTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating Services table:', err);
            return;
        }
        console.log('Services table ready');
    });

    db.query(createUsersTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating users table:', err);
            return;
        }
        console.log('Users table ready');
    });

    db.query(createTokensTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating tokens table:', err);
            return;
        }
        console.log('Tokens table ready');
    });
});

module.exports = db;
