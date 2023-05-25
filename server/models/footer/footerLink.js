const mongoose = require('mongoose');

const FooterLinkSchema = mongoose.Schema({
    title: String,
    path: String,
    order: Number,
    active: { type: Boolean, default: 'true' },   
});

module.exports = mongoose.model('FooterLink', FooterLinkSchema);