import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/dbConfig.js'; // Import the connectDB function
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import path from 'path';
import fs from 'fs'
import crypto from 'crypto'
import userRoutes from './routes/userRoutes.js';

const port = 8000;
const app = express();
dotenv.config();

const CONNECTION_STRING = String(process.env.CONNECTION_STRING)

// Start the server after connecting to the database
const startServer = async () => {
    try {
        await connectDB(); // Ensure the DB is connected
        app.use(cors({
            origin: process.env.FRONTEND_URL, // Allow the frontend origin
            credentials: true,
        }));

        app.use(cookieParser());
        app.use(express.json());

        app.use('/', userRoutes);

        const storage = new GridFsStorage({
            url: CONNECTION_STRING,
            // options: { useNewUrlParser: true, useUnifiedTopology: true },
            file: async (req, file) => {
              try {
                return new Promise((resolve, reject) => {
                  crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                      return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        
                        filename: filename,
                        bucketName: 'uploads' // Must match the bucket name
                    };
                    resolve(fileInfo);
                  });
                });
              } catch (err) {
                console.error('Error in file handling:', err);
              }
            }
          });
          
          const upload = multer({ storage });
          
          // Route to upload a file using Multer
          app.post('/upload', upload.single('file'), async (req, res) => {
            try {
              res.status(200).json({ file: req.file });
            } catch (err) {
              res.status(500).json({ error: 'Error during file upload', details: err.message });
            }
          });
          

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer(); // Start the server
