const Session = require('../models/session.model')
const mongoose = require('mongoose');

const sessionController ={};

sessionController.findAll = async function (req, res) {
    console.log ("body", req.body);
    const filter = req?.body?.email?{"email":req.body?.email} :{};
    console.log('filter= ', filter);
    try {
        const sessions = await Session.find(filter);
        res.status(200).json(sessions);
    } catch(err) {
        res.status(400).json({message: 'Failed to load sessions', error:err.message});
    }
}

module.exports=sessionController;