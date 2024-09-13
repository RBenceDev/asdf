exports.serviceVerify = (req, res) => {

    setInterval(() => {
        const asd = [];
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    
            db.query('INSERT INTO tokens (token, user_id) VALUES (?, ?)', [token, user.id], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error saving token' });
                }
                res.status(200).json({ token });
            });
        });

        asd.forEach(element => {
            if (element > (Date.now() + 2505000000)) {
                console.log('EZT KELL LASSAN TÖRÖLNI BAMEG')
            } else if (element > (Date.now() + 2592000000)) {
                
                db.query('DELETE FROM tokens WHERE token = ?', [token], (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error deleting token' });
                    }
                })
            } else { 
                return false;
            }
        })

    }, 864000);
};

exports.serviceExpired = (req, res) => {
    res.status(200).json({ message: 'Service expired' });
}
