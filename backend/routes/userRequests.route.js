const userRequestController = require('../controllers/userRequests.controller');
const express = require('express');
const router = express.Router();

router.post('/findAll', userRequestController.findAll);
router.post('/', userRequestController.create);
router.put('/:id', userRequestController.update);

module.exports = router;