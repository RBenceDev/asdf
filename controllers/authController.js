const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../panelapi/create/user/userCreate');
require('dotenv').config();

exports.register = (req, res) => {
    const { email, username, password } = req.body;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    console.log(firstname, lastname);
    db.query('SELECT username FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        let userid = uuidv4();
        
        db.query('INSERT INTO users (userid, email, username, firstname, lastname, password, coin) VALUES (?, ?, ?, ?, ?, ?, 0)', [userid, email, username, firstname, lastname, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
            //createUser(email, username, firstname, lastname, password);
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        db.query('INSERT INTO tokens (token, user_id) VALUES (?, ?)', [token, user.id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving token' });
            }
            res.status(200).json({ token });
        });
    });
};

exports.logout = (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    db.query('DELETE FROM tokens WHERE token = ?', [token], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting token' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
