const Profile = require('../models/profile.model')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authController = {};

authController.login = async function (req, res) {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    if (!userEmail) {
        return res.status(400).json({ message: 'email not found'});
    }
    try {
        user = await Profile.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json( {message: 'user not found'});
        }
        const isValid = await bcrypt.compare(userPass, user.password);
        if (!isValid) {
            return res.status(401).json( { message: 'wrong password'});
        }
        res.status(200).json( {message: 'successfully authentificated'})
    } catch(err) {
        res.status(400).json({message: 'failed to login', error: err.message});
    }
  };

// update password

  module.exports = authController;