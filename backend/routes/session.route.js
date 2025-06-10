const sessionController = require('../controllers/session.controller');
const express = require('express');
const router = express.Router();

router.post('/', sessionController.findAll);

module.exports = router;