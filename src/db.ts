import mongoose, { ConnectOptions } from "mongoose"
import dotenv from 'dotenv';

dotenv.config();
const options: ConnectOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
};

// Get the MongoDB URI from environment variables
const mongoUri: string = process.env.MONGODB_URI || "";

if (!mongoUri) {
    throw new Error("MongoDB connection URI is not provided.");
}

// Connect to MongoDB
const connectToMongo = () => {
    mongoose.connect(mongoUri, options)
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
}

export default connectToMongo

