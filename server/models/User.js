const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        //required: true
    },
    lastname: {
        type: String,
        //required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: Boolean,
    avatar: {
        type: String,
        default: 'default.png'
    },
});

module.exports = mongoose.model('User', UserSchema);