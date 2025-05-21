const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema ({
    admin: Boolean, // was String in the API docs
    name: String,
    surname: String,
    role: String,
    bio: String,
    email: String,  
    password: String, // missing in the API docs                   
    phone: String,         
    photo: String,             
    technologies: [{
      name: String,
      version: String
    }]       
  })


const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

