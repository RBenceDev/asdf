const express = require('express');
const router = express.Router();
const papiController = require('../controllers/papiController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/create/paper', authenticateToken, papiController.createServerPaper);

module.exports = router;

