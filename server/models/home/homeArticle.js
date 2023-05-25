const mongoose = require('mongoose');

const HomeArticleSchema = mongoose.Schema({
    image1: String,
    lottie: String,
    title: String,
    txt1: String,
    txt2: String,
    btnPath: String,
    order: Number,
    active: { type: Boolean, default: 'true' },   
});

module.exports = mongoose.model('HomeArticle', HomeArticleSchema);