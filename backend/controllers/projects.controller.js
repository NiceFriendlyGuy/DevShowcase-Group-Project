const projectModel = require('../models/projects.model');

const projectController = {};

projectController.findAll = async function (req, res) {
    try {
        const projects = await projectModel.find();
        res.status(200).json(projects);
    } catch(err) {
        res.status(500).json( { message: 'Server Error', error: err.message } );
    }
}

