import {v4 as uuidv4} from 'uuid';
import db from '../config/db';
async function servicePay(service_type, paymentAmount) {
    const amount = userCoins - paymentAmount;
        db.query('UPDATE users SET coin=? WHERE name=?;', [amount, username], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error added coint to the user' });
            }
            let expiresId = Date.now() + 2592000000;
            let service_id = uuidv4();
            let service_type = "minecraft_paper";
            db.query('INSERT INTO services (expiresId, service_id, service_type userid) VALUES (?, ?)', [expiresId, service_type, service_id], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error while trying to setup service' });
                }
            });
            res.status(200).json({ message: 'Service purchased successfully' });
        });
}
exports.buyService = (req, res) => {
    try {
        const username = req.body.username;
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        } else {
            db.query('SELECT coin FROM users WHERE username = ?', [req.body.username], async (err, results) => {
                if (results.length === 0) {
                    return res.status(400).json({ message: 'Invalid username' });
                } else {
                        const userCoins = results[0].coins;
    
                        if (userCoins < req.body.amount) {
                            return res.status(400).json({ message: 'Insufficient funds' });
                        } else {
                            
                        }
                    }
            })
        }
    } catch (error) {
        console.log(error);
    }
    
}

exports.fineNewMonth = (req, res) => {
    res.status(200).json({ message: 'Fine added successfully' });
}

