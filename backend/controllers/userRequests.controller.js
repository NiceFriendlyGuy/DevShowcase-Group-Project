const UserRequest = require('../models/userRequest.model');
const mongoose = require('mongoose');

const userRequestController = {}

userRequestController.findAll = async function (req, res) {
    const filter = req.body || {};
    try {
        const requests = await UserRequest.find(filter);
        res.status(200).json(requests);
    } catch(err) {
        res.status(500).json({ message: 'Filter failed', error: err.message })
    }
}

userRequestController.create = async function (req, res) {
    //
}

userRequestController.update = async function (req, res) {
    //
}

module.exports = userRequestController;