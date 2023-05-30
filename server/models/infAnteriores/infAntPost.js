const mongoose = require('mongoose');

const InfAntPostSchema = mongoose.Schema({
    image1: String,
    claim: String,
    txt1: String, 
    txt2: String, 
    active: { type: Boolean, default: 'true' }, 
    order: Number, 
    btnTxt: String,
    btnPath: String, 
});

module.exports = mongoose.model('InfAntPost', InfAntPostSchema);