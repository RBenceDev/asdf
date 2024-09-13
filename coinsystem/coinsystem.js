const db = require("../config/db");

async function addCoin(username, amount) {
    try {
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        } else if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        } else {
            db.query('SELECT username FROM users WHERE username = ?', [username], async (err, results) => {
                if(results.length > 0) {
                    db.query('UPDATE users SET coin=? WHERE name=?;', [amount, username], (err, results) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error added coint to the user' });
                        }
                        res.status(201).json({ message: 'Coin added successfull' });
                    });
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addCoin
}

