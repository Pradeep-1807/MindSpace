import { connectDB, gfs } from "../config/dbConfig.js";
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


export {  uploadFile, getPosts };
