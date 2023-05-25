const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    navImage1: String,
    navImage2: String,
    title: String,
    path: String,
    order: Number,
    active: Boolean,   
});

module.exports = mongoose.model('Menu', MenuSchema);       