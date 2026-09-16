require('dotenv').config();

const connectToDatabase = require('./config/database');
const Movie = require('./models/Movie');
const Review = require('./models/Review');

const movieData = [
    { legacyId: 1, title: 'Movie Title 1', thumbnail: '/placeholder.jpg', rating: 4, description: 'Description for Movie Title 1' },
    { legacyId: 2, title: 'Movie Title 2', thumbnail: '/placeholder.jpg', rating: 5, description: 'Description for Movie Title 2' },
    { legacyId: 3, title: 'Movie Title 3', thumbnail: '/placeholder.jpg', rating: 3, description: 'Description for Movie Title 3' }
];

const reviewData = [
    { movieId: 1, reviewer: 'John Doe', comment: 'Great movie!', rating: 4 },
    { movieId: 1, reviewer: 'Jane Smith', comment: 'Enjoyed it a lot.', rating: 5 },
    { movieId: 2, reviewer: 'Alice Brown', comment: 'Fantastic!', rating: 5 }
];

async function seed() {
    await connectToDatabase();
    await Review.deleteMany({});
    await Movie.deleteMany({});
    const movies = await Movie.insertMany(movieData);
    const moviesByLegacyId = new Map(movies.map(movie => [movie.legacyId, movie._id]));
    await Review.insertMany(reviewData.map(({ movieId, ...review }) => ({
        ...review,
        movie: moviesByLegacyId.get(movieId)
    })));
    console.log('Database seeded');
}

seed().catch(error => {
    console.error(error);
    process.exitCode = 1;
});