const mongoose = require('mongoose');

const PdfSchema = mongoose.Schema({
    title: String,
    pdf: String,
    btnPath: String,
    order: Number,
    active: { type: Boolean, default: 'true' },   
});

module.exports = mongoose.model('Pdf', PdfSchema);