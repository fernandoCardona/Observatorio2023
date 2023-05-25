const mongoose = require('mongoose');

const SocialSchema = mongoose.Schema({
    image1: String,
    image2: String,
    title: String,
    path: String,
    order: Number,
    active: Boolean,   
});

module.exports = mongoose.model('Social', SocialSchema);  