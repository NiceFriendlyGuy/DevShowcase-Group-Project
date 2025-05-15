const Account = require('../models/accounts.model');
const mongoose = require('mongoose');

const accountController = {}

accountController.findAll = async function (req, res) {
    try {
        const projects = await accountController.find();
        res.status(200).json(projects);
    }

    catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
    //
}

accountController.create = async function (req, res) {
    //
}

accountController.update = async function (req, res) {
    //
}

accountController.delete = async function (req, res) {
    //
}

module.exports = accountController;