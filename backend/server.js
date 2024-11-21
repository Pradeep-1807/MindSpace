import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, upload, gfs } from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import { getFileById, getFileDetails, getPosts, uploadFile, deletePost } from './functions/postFunctions.js';
const port = process.env.PORT
const app = express();
dotenv.config();

// Start the server after connecting to the database
const startServer = async () => {
    try {
        await connectDB(); 

        app.use(cors({
            origin: process.env.FRONTEND_URL, 
            credentials: true,
            methods: ["GET", "POST", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));

        if (process.env.NODE_ENV === "production") {
            console.log("Running in production mode");
        }
          
        
        app.use(cookieParser());
        app.use(express.json());

        app.use('/', userRoutes);
        
        // Post Routes 
        app.post('/upload', upload.single('file'), uploadFile );
        app.get('/getPosts', getPosts);

        app.get("/streamPost/:postId", getFileById);
        app.get("/postDetails/:postId", getFileDetails)
        
        app.post('/deletePost/:postId', deletePost)
        app.get('/getPosts/:userId',getPosts)

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer();
