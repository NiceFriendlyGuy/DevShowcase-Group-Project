const accountController = require('../controllers/accounts.controller');
const express = require('express');
const router = express.Router();

router.get('/', accountController.findAll);
// router.post('/accounts', accountController.create);
// router.put('/accounts/:id', accountController.update);
// router.delete('/accounts/:id', accountController.delete);

module.exports = router;