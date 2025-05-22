const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
        
        title: String,
        link: String, 
        category: String,                
        technologies: [{
          name: String,
          version: String
        }], 
        authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], 
        description: String,
        photos: [String]           
      }, {
        timestamps: true // ajoute createdAt & updatedAt automatiquement
      }
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;