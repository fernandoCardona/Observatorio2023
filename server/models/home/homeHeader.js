const mongoose = require('mongoose');

const HomeHeaderSchema = mongoose.Schema({
    video: String,
    subTitle: String,
    title: String,
    claim: String,
    txt: String,
    order: Number,
    active: { type: Boolean, default: 'true' },   
});

module.exports = mongoose.model('HomeHeader', HomeHeaderSchema);