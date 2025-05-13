const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
        authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],           // OK, idéalement des ObjectId si MongoDB
        titre: String,
        technos: [String],
        lien: String,                 // vers le projet (GitHub, démo…)
        descriptionProjet: String,
        screenshot: String,           // URL ou nom de fichier
        videos: [String]                // ou [string] si plusieurs
      }
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;