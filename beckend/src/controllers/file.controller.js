import {File} from '../models/files.model.js'
import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import axios from 'axios';



const uploadFile = async (req, res) => {
    const { fileName, content, language} = req.body;
    const {_id} = req.user
  
    try {
      // Upload raw content to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(
        `data:text/plain;base64,${Buffer.from(content).toString('base64')}`,
        {
          resource_type: 'raw',
          public_id: `codefiles/${_id}/${fileName}`,
          overwrite: true,
        }
      );
  
      // Save or update file metadata
      const fileDoc = await File.findOneAndUpdate(
        { fileName, user: _id },
        {
          fileName,
          cloudinaryUrl: uploadRes.secure_url,
          publicId: uploadRes.public_id,
          language,
          user: _id,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );
      console.log("File document: ", fileDoc);
      

      const user = await User.findById(req.user._id);

// Check if file already exists in the user's files array
      const fileExists = user.files.some(file => file._id.equals(fileDoc._id));

      if (!fileExists) {
      user.files.push(fileDoc);  // Add the full object if not a duplicate
      await user.save();
}
  
      res.status(201).json({ message: 'File uploaded/updated', file: fileDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Cloudinary upload failed' });
    }
  }


  const editFile = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    try {
      // Find the file by ID
      const fileDoc = await File.findById(id);
      if (!fileDoc) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // Re-upload updated content to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(
        `data:text/plain;base64,${Buffer.from(content).toString('base64')}`,
        {
          resource_type: 'raw',
          public_id: fileDoc.publicId, // Re-use the existing public ID
          overwrite: true,
        }
      );
  
      // Update file metadata with the new content and timestamp
      fileDoc.cloudinaryUrl = uploadRes.secure_url;
      fileDoc.lastUpdated = new Date();
      await fileDoc.save();
  
      res.status(200).json({ message: 'File re-edited and saved', file: fileDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update file' });
    }
  }


  const getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch file metadata from the database
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    console.log("Public ID: ", file.publicId);


    // Fetch file metadata from Cloudinary
    const response = await cloudinary.api.resource(file.publicId, {
      resource_type: "raw",
    });

    if (!response || !response.secure_url) {
      return res.status(404).json({ error: "File content not found" });
    }

    // Fetch file content using Axios
    const contentResponse = await axios.get(response.secure_url, {
      responseType: "text",
    });

    if (!contentResponse || contentResponse.status !== 200) {
      console.error("Error fetching file content: ", contentResponse.statusText);
      return res.status(500).json({ error: "Error fetching file content" });
    }

    const content = contentResponse.data;

    // Send file content along with metadata
    res.status(200).json({
      fileName: file.fileName,
      language: file.language,
      content,
    });
  } catch (err) {
    console.error("Error fetching file:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

  export {
    uploadFile,
    editFile,
    getFileById
}