const profileController = require('../controllers/profiles.controller');
const express = require('express');
const router = express.Router();

router.get('/', profileController.findAll);
// router.post('/findAll', profileController.findAll)
router.post('/', profileController.create);
router.put('/:id', profileController.update);
router.delete('/:id', profileController.delete);

module.exports = router;