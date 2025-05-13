const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema ({
    nom: String,
    prenom: String,
    email: String,            
    password: String,          
    telephone: String,         
    adminStatus: Boolean,
    photo: String,             
    description: String       
  })


const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

