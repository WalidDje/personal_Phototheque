const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: { type: String, require: true },
    images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);