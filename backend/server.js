import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, upload, gfs } from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import { getPosts, uploadFile } from './functions/postFunctions.js';
import mongoose from 'mongoose';

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
        app.get('/getPosts', getPosts);
        // Endpoint to serve individual files by their ObjectId
        app.get('/file/:id', (req, res) => {
            if (!gfs) {
            return res.status(500).json({ message: 'GridFS is not initialized' });
            }
        
            const fileId = new mongoose.Types.ObjectId(req.params.id);
        
            gfs.find({ _id: fileId }).toArray((err, files) => {
                if (err || !files || files.length === 0) {
                    return res.status(404).json({ message: 'File not found' });
                }
            
                const file = files[0];
                res.setHeader('Content-Type', file.contentType);
                
                gfs.openDownloadStream(file._id).pipe(res);
            });
        });
  
        
      

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer();
