import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, upload } from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import { uploadFile } from './functions/postFunctions.js';

const port = 8000;
const app = express();
dotenv.config();

// Start the server after connecting to the database
const startServer = async () => {
    try {
        await connectDB(); // Connects to DB and initializes `upload`

        app.use(cors({
            origin: process.env.FRONTEND_URL, // Allow the frontend origin
            credentials: true,
        }));

        app.use(cookieParser());
        app.use(express.json());

        app.use('/', userRoutes);

        // Post Routes 
        app.post('/upload', upload.single('file'), uploadFile );

        

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer();
