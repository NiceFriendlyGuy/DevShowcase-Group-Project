const accountController = require('../controllers/profiles.controller');
const express = require('express');
const router = express.Router();

router.get('/', accountController.findAll);
router.post('/', accountController.create);
router.put('/:id', accountController.update);
router.delete('/:id', accountController.delete);

module.exports = router;