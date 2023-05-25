const mongoose = require('mongoose');

const HomeHeaderAncorSchema = mongoose.Schema({
    txt: String,
    path: String,
    order: Number,
    active: { type: Boolean, default: 'true' },    
});

module.exports = mongoose.model('HomeHeaderAncor', HomeHeaderAncorSchema);