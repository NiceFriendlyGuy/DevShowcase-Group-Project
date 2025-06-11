const projectController = require('../controllers/projects.controller');
const express = require('express');
const router = express.Router();

router.post('/findAll', projectController.findAll);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.put('/:id', projectController.delete);
router.delete('/:id', projectController.deleteHard);

module.exports = router;