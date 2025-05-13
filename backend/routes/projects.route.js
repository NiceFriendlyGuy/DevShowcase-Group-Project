const projectController = require('../controllers/projects.controller');
const express = require('express');
const router = express.Router();

router.get('/', projectController.findAll);
// router.post('/', projectController.create);
// router.put('/projects/:id', projectController.update);
// router.delete('/projects/:id', projectController.delete);

module.exports = router;