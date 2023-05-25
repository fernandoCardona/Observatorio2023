const mongoose = require('mongoose');

const HomeHeaderBoxSchema = mongoose.Schema({
    title: String,
    txt: String,
    order: Number,
    active: Boolean,   
});

module.exports = mongoose.model('HomeHeaderBox', HomeHeaderBoxSchema);