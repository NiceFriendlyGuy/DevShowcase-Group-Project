const Session = require('../models/session.model')
const mongoose = require('mongoose');

const sessionController ={};

sessionController.findAll = async function (req, res) {
    console.log ("query", req.query);
    const filter = req?.query?.email?{"email":req.query?.email} :{};
    console.log('filter= ', filter);
    try {
        const sessions = await Session.find(filter);
        res.status(200).json(sessions);
    } catch(err) {
        res.status(400).json({message: 'Failed to load sessions', error:err.message});
    }
}

module.exports=sessionController;