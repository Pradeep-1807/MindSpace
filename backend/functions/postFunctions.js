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
    const { title, content, category, username, email } = req.body;

    // Update the file metadata
    const fileId = req.file.id;
    const metadata = { title, content, category, username, email };

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
            category: category,
            username: username,
            email: email,
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
    const fileId = new mongoose.Types.ObjectId(req.params.postId);
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

const getFileDetails = async(req,res)=>{
  try {
    const postId = new mongoose.Types.ObjectId(req.params.postId)
    const postDetails = await gfs.find({_id: postId}).toArray()
    
    if (!postDetails || postDetails.length === 0){
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({
      message:'Post Details retrieved successfully',
      post:postDetails[0]
    })

  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const deletePost = async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.postId);
    
    const postToDelete = await gfs.find({ _id: postId }).toArray();
    
    if (!postToDelete || postToDelete.length === 0) {
      return res.status(400).json({
        error: 'No such post exists to delete',
      });
    }

    
    const {username, email} = req.body
    const {username: usernameToVerify, email: emailToVerify} = postToDelete[0].metadata

    if ((username === usernameToVerify) && (email === emailToVerify)){
      await gfs.delete(postId);
      console.log('User has access to delete the post')

      const checkDeletion = await gfs.find({ _id: postId }).toArray();
    
      if (checkDeletion.length === 0) {
        return res.status(200).json({
          status:true,
          message: 'Post deleted successfully',
        });
      } else {
        return res.status(500).json({
          error: 'Failed to delete the post',
        });
      }
    }
    else{
      res.status(401).json({
        error: "User has no access to delete the post"
      })
    }

    
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({
      error: 'An error occurred while deleting the post',
    });
  }
};

export {  uploadFile, getPosts, getFileById, getFileDetails, deletePost };
