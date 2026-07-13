import mongoose from 'mongoose';
import config from './config.js';
import dns from "node:dns/promises";

const connectDB = async () => {
    try {
        dns.setServers(["8.8.8.8"]);
        const conn = await mongoose.connect(config.mongoUrl, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;