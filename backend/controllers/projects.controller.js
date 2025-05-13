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

projectController.create = async function (req, res) {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject)
    } catch(err) {
        res.status(400).json({ message: 'Project creation failed', error: err.message })
    }
}

projectController.update = async function (req, res) {
    //
}

projectController.delete = async function (req, res) {
    //
}