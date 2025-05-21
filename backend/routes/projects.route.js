const projectController = require('../controllers/projects.controller');
const express = require('express');
const router = express.Router();

// router.get('/', projectController.findAll);

router.post('/findAll', projectController.findAll);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;