const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

test('accepts valid movie data', () => {
    const movie = new Movie({
        legacyId: 1,
        title: 'A Movie',
        thumbnail: '/placeholder.jpg',
        rating: 4,
        description: 'A description'
    });

    assert.equal(movie.validateSync(), undefined);
});

test('rejects invalid movie ratings and missing fields', () => {
    const error = new Movie({ rating: 6 }).validateSync();

    assert.ok(error.errors.title);
    assert.ok(error.errors.thumbnail);
    assert.ok(error.errors.description);
    assert.ok(error.errors.rating);
});

test('rejects malformed movie thumbnail URLs', () => {
    const error = new Movie({
        legacyId: 1,
        title: 'A Movie',
        thumbnail: 'not-a-url',
        rating: 4,
        description: 'A description'
    }).validateSync();

    assert.ok(error.errors.thumbnail);
});

test('requires a referenced movie for reviews', () => {
    const error = new Review({
        reviewer: 'Reviewer',
        rating: 4,
        comment: 'A comment'
    }).validateSync();

    assert.ok(error.errors.movie);
});

test('uses an ObjectId movie reference and validates review ratings', () => {
    const movieId = new mongoose.Types.ObjectId();
    const validReview = new Review({ movie: movieId, reviewer: 'Reviewer', rating: 5, comment: 'A comment' });
    const invalidReview = new Review({ movie: movieId, reviewer: 'Reviewer', rating: 0, comment: 'A comment' });

    assert.equal(validReview.validateSync(), undefined);
    assert.equal(validReview.movie.constructor, mongoose.Types.ObjectId);
    assert.ok(invalidReview.validateSync().errors.rating);
});