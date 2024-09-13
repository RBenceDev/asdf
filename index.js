    const express = require('express');
    const cors = require('cors');
    const { createServer, createServerPaper } = require('./panelapi/create/Minecraft/Paper');
    const authRoutes = require('./routes/authRoutes');
    const papiRoutes = require('./routes/papiRoutes');


    const app = express();


    app.use(express.json());
    app.use(cors()); 

    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/papi', papiRoutes);

    

    app.get('/teszt/asdasd', (req, res) => {
        res.json({ message: 'Ez a /teszt/asdasd endpoint!' });
    });

    app.get('/teszt/asdasdasd', (req, res) => {
        res.json({ message: 'Ez a /teszt/asdasdasd endpoint!' });
    });

    const PORT = 8080;

    app.listen(PORT, () => {
        console.log(`Szerver fut a ${PORT} porton`);
    });