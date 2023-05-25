const mongoose = require('mongoose');

const IntSobreHeaderSchema = mongoose.Schema({
    image: String,
    claim: String,
    order: Number,  
    active: { type: Boolean, default: 'true' },  
});

module.exports = mongoose.model('IntSobreHeader', IntSobreHeaderSchema);