const mongoose = require('mongoose');

async function connectToDatabase() {
    const connectionUrl = process.env.MONGODB_URI;

    if (!connectionUrl) {
        throw new Error('MONGODB_URI is not set');
    }

    try {
        await mongoose.connect(connectionUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
}

module.exports = connectToDatabase;