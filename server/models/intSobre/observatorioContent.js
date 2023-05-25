const mongoose = require('mongoose');

const ObservatorioContentSchema = mongoose.Schema({
    title: { type: String, required: true },
    subtitle1:{ type: String },
    content1: { type: String },
    subtitle2:{ type: String },
    content2: { type: String },
    subtitle3:{ type: String },
    content3: { type: String }, 
    subtitle4:{ type: String },
    content4: { type: String },
    subtitle5:{ type: String },
    content5: { type: String }, 
    subtitle6:{ type: String },
    content6: { type: String },
    subtitle7:{ type: String },
    content7: { type: String },
    subtitle8:{ type: String },
    content8: { type: String },
    btnTxt: { type: String },
    active: { type: Boolean, default: 'true' },  
    order: Number,
});

module.exports = mongoose.model('ObservatorioContent', ObservatorioContentSchema);