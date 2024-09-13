const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../panelapi/create/user/userCreate');
require('dotenv').config();

exports.createServerPaper = (req, res) => {
    const serverName = req.body.serverName;
    const userEmail = req.body.userEmail;
    const settedMemory = req.body.memory;
    const settedDisk = req.body.disk;
    const settedCpu = req.body.cpu;
    const backup = 5;
    const version = req.body.vesion;
    const settedDb = req.body.db

    function counter() {
        const memoryCounter = calculateMemoryCost(settedMemory);
        const diskCounter = calculateStorageCost(settedDisk);
        const cpuCounter = calculateThreadsCost(settedCpu);
        const dbCounter = calculateDatabasesCost(settedDb);

        return (memoryCounter + diskCounter + cpuCounter + dbCounter);
    }
    function calculateMemoryCost(settedMemory) {
        settedMemory = parseFloat(settedMemory);
        if (settedMemory <= 8) {
            return (settedMemory * 500).toFixed(0);
        } else if (settedMemory > 8) {
            return ((settedMemory * 450)).toFixed(0);
        }
    }
    
    function calculateStorageCost(storage) {
        storage = parseFloat(storage);
        return (storage > 15 ? (storage - 15) * 25 : 0).toFixed(0);
    }
    
    function calculateDatabasesCost(databases) {
        databases = parseInt(databases);
        return (databases > 4 ? (databases - 4) * 300 : 0).toFixed(0);
    }
    
    function calculateThreadsCost(threads) {
        threads = parseInt(threads);
        return (threads > 1 ? (threads - 1) * 500 : 0).toFixed(0);
    }

    const counterCost = counter();

    console.log(counterCost);
    //createServerPaper(serverName, userEmail, memory, disk, cpu, db, backup, version);

    res.status(201).json({ message: 'Server created successfully' });
};

