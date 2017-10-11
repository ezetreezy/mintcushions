const mongoose = require('mongoose');
const {Schema} = mongoose;

const bootSchema = new Schema({
    brand: String,
    name: String,
    reviewCount: Number,
});

mongoose.model('boots', bootSchema);
