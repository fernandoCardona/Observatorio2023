const mongoose = require('mongoose');

const FooterTxtSchema = mongoose.Schema({
    txt: String,
    order: Number,
    active: { type: Boolean, default: 'true' },   
});

module.exports = mongoose.model('FooterTxt', FooterTxtSchema);