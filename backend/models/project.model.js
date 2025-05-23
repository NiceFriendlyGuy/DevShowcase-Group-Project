const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
        
        title: String,
        category: String,  
        date: Date,
        link: String,               
        technologies: [{
          name: String,
          version: String,
          _id: false
        }], 
        authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], 
        description: String,
        photos: [String],
        isDeleted: { 
          type: Boolean,
          default: false
        }           
      }, {
        timestamps: true // ajoute createdAt & updatedAt automatiquement
      }
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;