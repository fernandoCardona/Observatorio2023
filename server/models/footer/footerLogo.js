const mongoose = require('mongoose');

const FooterLogoSchema = mongoose.Schema({
    image:String,
    title: String,
    path: String,
    order: Number,
    active: Boolean,   
});

module.exports = mongoose.model('FooterLogo', FooterLogoSchema);