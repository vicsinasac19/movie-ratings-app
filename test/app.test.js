const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { createApp } = require('../app');

const movie = { _id: 'movie-object-id', legacyId: 1, title: 'Test Movie', thumbnail: '/placeholder.jpg', rating: 4, description: 'Description' };

const MovieModel = {
    find: () => ({ sort: async () => [movie] }),
    findOne: async ({ legacyId }) => legacyId === 1 ? movie : null
};

const ReviewModel = {
    find: () => ({ sort: async () => [] }),
    create: async review => review
};

test('renders movies loaded from the model', async () => {
    const response = await request(createApp({ MovieModel, ReviewModel })).get('/');

    assert.equal(response.status, 200);
    assert.match(response.text, /Test Movie/);
});

test('saves a review for an existing movie and redirects', async () => {
    const response = await request(createApp({ MovieModel, ReviewModel }))
        .post('/submit-review')
        .type('form')
        .send({ movieId: 1, reviewer: 'Reviewer', rating: 5, comment: 'Great' });

    assert.equal(response.status, 302);
    assert.equal(response.headers.location, '/movie/1');
});

test('returns not found for an unknown movie', async () => {
    const response = await request(createApp({ MovieModel, ReviewModel })).get('/movie/99');

    assert.equal(response.status, 404);
});