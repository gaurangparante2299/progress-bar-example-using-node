const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    filename: String,
    fileSize: Number,
});

module.exports = mongoose.model('Upload', uploadSchema);
