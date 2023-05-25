const mongoose = require('mongoose');

const InfoAnterioresHeaderSchema = mongoose.Schema({
    image: String,
    claim: String,
    active: { type: Boolean, default: 'true' }, 
    order: Number,   
});

module.exports = mongoose.model('InfoAnterioresHeader', InfoAnterioresHeaderSchema);