const mongoose = require('mongoose');

const InfAnterioresBlockTxtSchema = mongoose.Schema({
    image1: String,
    image2: String,
    txt: String,  
    active: { type: Boolean, default: 'true' }, 
    order: Number, 
});

module.exports = mongoose.model('InfAnterioresBlockTxt', InfAnterioresBlockTxtSchema);