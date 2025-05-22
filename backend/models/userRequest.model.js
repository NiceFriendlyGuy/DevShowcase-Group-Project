const mongoose = require('mongoose');
const Profile = require('./profile.model');

const userRequestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile' 
    },
    status: { 
        type: String, 
        enum: [
            'pending', 
            'solved'], 
        default: 'pending' 
    },
    type: { 
        type: String, 
        enum: [
            'Demande de support', 
            'Demande de verification', 
            'Plainte', 
            'Suggestion',
            'Autre demande'],
        required: true
        },
    message: String
}, {
    timestamps: true
});

const UserRequest = mongoose.model('UserRequest', userRequestSchema);

module.exports = UserRequest;