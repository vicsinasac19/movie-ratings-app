# Movie Ratings & Reviews App

This is a simple movie ratings and reviews app built with Express, EJS, and MongoDB.

## File Structure

```
project-root/
│
├── views/
│   ├── index.ejs
│   ├── movie-detail.ejs
│   └── submit-review.ejs
├── public/
│   ├── styles.css
│   └── placeholder.jpg
├── node_modules/
├── config/database.js
├── models/
│   ├── Movie.js
│   └── Review.js
├── seed.js
├── test/
│   ├── app.test.js
│   └── models.test.js
├── app.js
├── .env
├── package.json
└── package-lock.json
```

## Setup

1. **Install the dependencies:**
   ```sh
   npm install
   ```

2. **Configure MongoDB:**

Set `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/movie-ratings-app
```

Use a MongoDB Atlas connection string instead if you are using Atlas.

3. **Seed the sample movies and reviews:**

```sh
node seed.js
```

4. **Run the application:**
   ```sh
   node app.js
   ```

5. **Open your web browser and go to:**
   ```
   http://localhost:3000
   ```

## Tests

Tests are included for model validation, MongoDB references, and route behavior. They are not run as part of setup. To run them manually:

```sh
npm test
```
