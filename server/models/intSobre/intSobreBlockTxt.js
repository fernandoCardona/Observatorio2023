const mongoose = require('mongoose');

const IntSobreBlockTxtSchema = mongoose.Schema({
    image1: String,
    image2: String,
    txt1: String, 
    txt2: String, 
    order: Number,
    active: { type: Boolean, default: 'true' },  
});

module.exports = mongoose.model('IntSobreBlockTxt', IntSobreBlockTxtSchema);