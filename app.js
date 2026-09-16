const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database');
const Movie = require('./models/Movie');
const Review = require('./models/Review');

dotenv.config();

function createApp({ MovieModel = Movie, ReviewModel = Review } = {}) {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/', async (req, res, next) => {
        try {
            const movies = await MovieModel.find().sort({ legacyId: 1 });
            res.render('index', { movies });
        } catch (error) {
            next(error);
        }
    });

    app.get('/movie/:id', async (req, res, next) => {
        try {
            const movie = await MovieModel.findOne({ legacyId: Number(req.params.id) });

            if (!movie) {
                return res.status(404).send('Movie not found');
            }

            const movieReviews = await ReviewModel.find({ movie: movie._id }).sort({ createdAt: -1 });
            res.render('movie-detail', { movie, reviews: movieReviews });
        } catch (error) {
            next(error);
        }
    });

    app.get('/submit-review', (req, res) => {
        res.render('submit-review');
    });

    app.post('/submit-review', async (req, res, next) => {
        try {
            const movieId = Number(req.body.movieId);
            const movie = await MovieModel.findOne({ legacyId: movieId });

            if (!movie) {
                return res.status(404).send('Movie not found');
            }

            await ReviewModel.create({
                movie: movie._id,
                reviewer: req.body.reviewer,
                rating: req.body.rating,
                comment: req.body.comment
            });
            res.redirect(`/movie/${movieId}`);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send('Invalid review data');
            }
            next(error);
        }
    });

    return app;
}

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    connectToDatabase()
        .then(() => {
            createApp().listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch(() => {
            process.exitCode = 1;
        });
}

module.exports = { createApp };