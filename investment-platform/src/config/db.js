import mongoose from 'mongoose';
import config from './config.js';

async function connectDB() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to DB.');
    }
    catch (error) {
        console.error('Failed to connecting DB.', error);
        process.exit(1);
    };
};

export default connectDB;