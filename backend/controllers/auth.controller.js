const Profile = require('../models/profile.model');
const Session = require('../models/session.model');
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
        const user = await Profile.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json( {message: 'user not found'});
        }
        const isValid = await bcrypt.compare(userPass, user.password);
        if (!isValid) {
            return res.status(401).json( { message: 'wrong password'});
        }
        const session = await Session.insertOne({email: userEmail});
        if (!session) {
            return res.status(401).json( { message: 'session does not exist'});
        }
        res.status(200).json( {
            message: 'successfully authentificated',
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                admin: user.admin,
                role: user.role,
                email: user.email,
                createdAt: user.createdAt
            }
        })
    } catch(err) {
        res.status(400).json({message: 'failed to login', error: err.message});
    }
  };

// update password
authController.changePassword = async function (req, res) {
    const id = req.params.id;
    const currentPass = req.body.currentPassword;
    const newPass = req.body.newPassword

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:'Id not existant'});
    }
    try {
        // confirming the password typed is right before proceeding
        const user = await Profile.findById(id);
        if (!user) {
            return res.status(400).json( {message: 'user not found'});
        }
        const isValid = await bcrypt.compare(currentPass, user.password);
        if (!isValid) {
            return res.status(401).json( { message: 'wrong password'});
        }
        // add bcrypt for password hash if updated
        const hashedPass = await bcrypt.hash(newPass, 10);
        user.password = hashedPass;
        await user.save();

        res.status(200).json({ message: `the password of ${user.name} was successfully updated` });
    } catch(err) {
        res.status(400).json({message:"failure to update password", error: err.message});
    }
}


// logout
authController.logout = async function (req,res) {
    const userEmail = req.body.email;
    try {
        const session = await Session.findOne({email:userEmail, status:true});
        if (!session) {
            return res.status(400).json( {message: 'session not found'});
        }

        const outcome = await Session.findOneAndUpdate({_id: session._id}, {status:false});
        res.status(200).json({message:"logout successfull"});

    } catch (err) {
        res.status(400).json({message:"failure to log out", error:err.message});
    }
}

// reset password

// forgot password

  module.exports = authController;