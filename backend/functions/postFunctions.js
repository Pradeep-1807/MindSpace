import { gfs } from "../config/dbConfig.js";
import mongoose from 'mongoose';



const uploadFile = async (req, res) => {
  try {
    // Check if GridFS is initialized
    if (!gfs) {
      return res.status(500).json({
          message: 'GridFS is not initialized',
      });
    }
    
    // Check if the file was uploaded
    if (!req.file || !req.file.id) {
      console.log('File upload failed');
      return res.status(400).json({
        message: 'Failed to upload the file',
      });
    }
    
    // Extract metadata from request body
    const { title, content } = req.body;

    // Update the file metadata
    const fileId = req.file.id;
    const metadata = { title, content };

    // Find the uploaded file and update its metadata
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: 'Invalid file ID' });
    }

    // Update the file metadata in the .files collection
    const result = await mongoose.connection.db.collection('uploads.files').updateOne(
      { _id: new mongoose.Types.ObjectId(fileId) },
      {
        $set: {
          metadata: {
            title: title,
            content: content,
          },
        },
      }
    );

    // Respond with success
    res.status(200).json({ 
      message: 'File uploaded successfully',
      metadata: metadata,
      file: req.file
    });
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
    console.log('single file : ', file)

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
