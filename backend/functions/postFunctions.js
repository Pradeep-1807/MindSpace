import { gfs } from "../config/dbConfig.js";
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
// Function to handle file upload
const uploadFile = async (req, res) => {
  try {
      const { title, content } = req.body
      res.status(200).json({ 
        message: 'File upload successfull',
        title: title,
        content: content,
        file: req.file });
  } catch (err) {
      res.status(500).json({ error: 'Error during file upload', details: err.message });
  }
};



const getPosts =  async (req, res) => {
  try {
      if (!gfs) {
          return res.status(500).json({
              message: 'GridFS is not initialized',
          });
      }

      const files = await gfs.find().toArray();
      if (!files || files.length === 0) {
          return res.status(404).json({
              message: 'No files found',
          });
      }

      res.json({
          message: 'Files retrieved successfully',
          files,
      });
  } catch (error) {
      console.error('Error retrieving posts/files:', error);
      res.status(500).json({
          message: 'Error retrieving posts/files',
          error,
      });
  }
}

const getFileById = async (req, res) => {
    try {
      const fileId = new mongoose.Types.ObjectId(req.params.id);
      const file = await gfs.find({ _id: fileId }).toArray();
  
      if (!file || file.length === 0) {
        return res.status(404).json({ error: "File not found" });
      }
  
      res.set("Content-Type", file[0].contentType);
      const readstream = gfs.openDownloadStream(fileId);
      readstream.pipe(res);
    } catch (error) {
      console.error("Error retrieving file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


export {  uploadFile, getPosts, getFileById };
