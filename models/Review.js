const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'A movie reference is required']
    },
    reviewer: {
        type: String,
        required: [true, 'Reviewer name is required'],
        trim: true,
        minlength: [1, 'Reviewer name cannot be empty'],
        maxlength: [100, 'Reviewer name cannot exceed 100 characters']
    },
    rating: {
        type: Number,
        required: [true, 'Review rating is required'],
        min: [1, 'Review rating must be at least 1'],
        max: [5, 'Review rating cannot exceed 5'],
        validate: {
            validator: Number.isInteger,
            message: 'Review rating must be an integer'
        }
    },
    comment: {
        type: String,
        required: [true, 'Review comment is required'],
        trim: true,
        minlength: [1, 'Review comment cannot be empty'],
        maxlength: [2000, 'Review comment cannot exceed 2000 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);