const mongoose = require('mongoose');

const InfAntPostSchema = mongoose.Schema({
    image: String,
    imageTitle: String,
    title: String, 
    txt: String, 
    btnTxt: String, 
});

module.exports = mongoose.model('InfAntPost', InfAntPostSchema);