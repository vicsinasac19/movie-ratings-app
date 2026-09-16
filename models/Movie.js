const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    legacyId: {
        type: Number,
        required: [true, 'Movie ID is required'],
        unique: true,
        min: [1, 'Movie ID must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Movie ID must be an integer'
        }
    },
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        trim: true,
        minlength: [1, 'Movie title cannot be empty'],
        maxlength: [200, 'Movie title cannot exceed 200 characters']
    },
    thumbnail: {
        type: String,
        required: [true, 'Movie thumbnail is required'],
        trim: true,
        match: [/^(https?:\/\/|\/|data:image\/)/, 'Movie thumbnail must be a valid URL or local path']
    },
    rating: {
        type: Number,
        required: [true, 'Movie rating is required'],
        min: [1, 'Movie rating must be at least 1'],
        max: [5, 'Movie rating cannot exceed 5'],
        validate: {
            validator: Number.isInteger,
            message: 'Movie rating must be an integer'
        }
    },
    description: {
        type: String,
        required: [true, 'Movie description is required'],
        trim: true,
        minlength: [1, 'Movie description cannot be empty'],
        maxlength: [2000, 'Movie description cannot exceed 2000 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);