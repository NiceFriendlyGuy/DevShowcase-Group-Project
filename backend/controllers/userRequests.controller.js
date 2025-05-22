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
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(404).json({ message: 'invalid or missing userId' });
    }
    try {
        const newRequest = new UserRequest(req.body);
        await newRequest.save()
        res.status(201).json(newRequest)
    } catch(err) {
        res.status(400).json({ message: 'Unable to create new request', error: err.message})
    }
}

userRequestController.update = async function (req, res) {
    //
}

module.exports = userRequestController;