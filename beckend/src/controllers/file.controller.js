import {File} from '../models/files.model.js'
import { User } from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';


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

      await User.findByIdAndUpdate(
            _id,
            { $addToSet: { files: fileDoc._id } },  // Ensures no duplicates
            { new: true }
        );
  
      res.status(200).json({ message: 'File uploaded/updated', file: fileDoc });
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

  export {
    uploadFile,
    editFile
}