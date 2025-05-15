const Account = require('../models/accounts.model');
const mongoose = require('mongoose');

const accountController = {}

accountController.findAll = async function (req, res) {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    }

    catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
    //
}

accountController.create = async function (req, res) {
    try {
        const newAccount = new Account(req.body);
        await newAccount.save();
        res.status(200).json(newAccount);
    }
    catch (err) {
        res.status(400).json({message:"Unable to create account", error: err.message });
    }//
}

accountController.update = async function (req, res) {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message:'Id not existant'});
        }
        const updatedAccount = await Account.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedAccount)
        {
            return res.status(404).json({message:'account to update: not found'});
        }

        res.status(200).json(updatedAccount);
    }

    catch(err) {
        res.status(400).json({message:"failure to update account", error: err.message});
    }
}

accountController.delete = async function (req, res) {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(404).json({message:"Id not existant"});
        }

        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount)
        {
            return res.status(400).json({message: "failed to delete account"});
        }

        res.status(200).json({message:"account deleted successfully"});
    }
    
    catch(err)
    {
        res.status(400).json({message:"failure to delete account", error:err.message});
    }
    //
}

module.exports = accountController;