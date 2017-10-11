const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    bootbrand: String,
    bootname: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _reviewID: {type: Number, default: 0},
    title: String,
    body: String,
    dateReviewed: Date,
    reviewName: String,
    ratingOverall: {type: Number, default: 0},
    ratingDurability: {type: Number, default: 0},
    ratingTraction: {type: Number, default: 0},
    ratingTouch: {type: Number, default: 0},
    ratingProtection: {type: Number, default: 0}
});

mongoose.model('reviews', reviewSchema);
