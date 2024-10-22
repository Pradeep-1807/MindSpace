import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import { gfs } from '../config/dbConfig.js'; // Ensure gfs is imported

const connectionString = String(process.env.CONNECTION_STRING);

const storage = new GridFsStorage({
  url: connectionString,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
      return {
          filename: file.originalname,
          bucketName: 'uploads', // Collection name
      };
  },
});

const upload = multer({ storage });

// Function to handle file upload
const uploadFile = (req, res, next) => {
  if (!gfs) {
      return res.status(500).json({ message: 'GridFS not initialized yet, try again later' });
  }
  upload.single('file')(req, res, (err) => {
      if (err) {
          return res.status(500).json({ message: 'Error during file upload', error: err });
      }
      next(); // Move to the next middleware if upload is successful
  });
};

// After file upload, return the uploaded file details
const isFileUploaded = (req, res) => {
  if (req.file) {
    const fileUrl = `${req.protocol}://${req.get('host')}/image/${req.file.id}`;
    return res.status(200).json({
      message: 'File uploaded successfully',
      file: { url: fileUrl },
    });
  } else {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }
};

// Retrieve uploaded files or posts
const getPosts = async (req, res) => {
  // try {
  //   gfs.files.find().toArray((err, files) => {
  //     if (err || !files || files.length === 0) {
  //       return res.status(404).json({
  //         message: 'No files found',
  //       });
  //     }
  //     res.json({
  //       message: 'Files retrieved successfully',
  //       files,
  //     });
  //   });
  // } catch (error) {
  //   console.error('Error retrieving posts/files:', error);
  //   res.status(500).json({
  //     message: 'Error retrieving posts/files',
  //     error,
  //   });
  // }
  res.status(200).json({
    
  })
};

export { getPosts, uploadFile, isFileUploaded };
