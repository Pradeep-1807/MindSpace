import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import { gfs } from '../config/dbConfig.js'; // Ensure gfs is imported
import { upload } from '../config/dbConfig.js';

// Function to handle file upload
const uploadFile = async (req, res) => {
  try {

      res.status(200).json({ 
        title: req.body.title,
        content: req.body.content,
        file: req.file });
  } catch (err) {
      res.status(500).json({ error: 'Error during file upload', details: err.message });
  }
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
