import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';

let gfs;

// Connect to the database and initialize GridFS
const connectDB = async () => {

    const CONNECTION_STRING = String(process.env.CONNECTION_STRING)

    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

    const conn = mongoose.connection;
    

    // Initialize GridFSBucket inside a try...catch

    let bucket;
    conn.once('open', () => {
    try {
        gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads' // Custom bucket name
        });
        console.log('GridFS Bucket initialized');
    } catch (err) {
        console.error('Error initializing GridFSBucket:', err);
    }
    });

};

export { connectDB, gfs };
