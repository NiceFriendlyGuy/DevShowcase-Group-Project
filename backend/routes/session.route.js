const sessionController = require('../controllers/session.controller');
const express = require('express');
const router = express.Router();

router.get('/', sessionController.findAll);

module.exports = router;