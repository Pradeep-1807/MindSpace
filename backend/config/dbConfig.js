import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;
let gfs;
let upload;

// Connect to the database and initialize GridFS
const connectDB = async () => {
  try {
      const conn = await mongoose.connect(CONNECTION_STRING);
      console.log('MongoDB connected');

      gfs = new mongoose.mongo.GridFSBucket(conn.connection.db, {
          bucketName: 'uploads' // Custom bucket name
      });
      console.log('GridFS Bucket initialized:', gfs); // Log gfs initialization

      const storage = new GridFsStorage({
          url: CONNECTION_STRING,
          file: async (req, file) => {
              return new Promise((resolve, reject) => {
                  crypto.randomBytes(16, (err, buf) => {
                      if (err) {
                          return reject(err);
                      }
                      const filename = buf.toString('hex') + path.extname(file.originalname);
                      const fileInfo = {
                          filename: filename,
                          bucketName: 'uploads'
                      };
                      resolve(fileInfo);
                  });
              });
          }
      });
      
      upload = multer({ storage });
  } catch (err) {
      console.error('Error connecting to MongoDB:', err);
  }
};


export { connectDB, upload, gfs };
