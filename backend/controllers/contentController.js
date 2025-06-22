const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Configuration Constants
const MAX_FILE_SIZE_MB = 100;
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Supported File Types
const FILE_TYPES = {
  blog: ['image/jpeg', 'image/png', 'image/webp'],
  news: ['image/jpeg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/webm'],
  audio: ['audio/mpeg', 'audio/wav']
};

// Helper to delete files
const deleteFilesIfExist = async (fileUrls) => {
  if (!fileUrls || !Array.isArray(fileUrls)) return;
  
  await Promise.all(
    fileUrls.map(async (url) => {
      if (!url) return;
      
      try {
        const filename = path.basename(url);
        const fullPath = path.join(UPLOADS_DIR, filename);
        
        if (fs.existsSync(fullPath)) {
          await fs.promises.unlink(fullPath);
        }
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    })
  );
};

// Get file type from URL extension
const getFileTypeFromUrl = (url) => {
  const ext = path.extname(url).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return 'image';
  if (['.mp4', '.webm'].includes(ext)) return 'video';
  if (['.mp3', '.wav'].includes(ext)) return 'audio';
  return 'other';
};

// Get original filename
const getOriginalName = (files, url) => {
  if (!files) return path.basename(url);
  const file = Object.values(files)
    .flat()
    .find(f => `/uploads/${f.filename}` === url);
  return file?.originalname || path.basename(url);
};

// Get file size
const getFileSize = (files, url) => {
  if (!files) return 0;
  const file = Object.values(files)
    .flat()
    .find(f => `/uploads/${f.filename}` === url);
  return file?.size || 0;
};

// Create Content
const createContent = async (req, res) => {
  try {
    // Destructure request body
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;

    // Validate required fields
    if (!title || !description || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type and category are required'
      });
    }

    // Process uploaded files
    const mainFiles = req.files?.['file'] || [];
    const writerPhotos = req.files?.['writers[0][photo]'] || [];

    // Combine existing and new file URLs
    const fileUrls = [
      ...(existingFileUrls?.split(',') || []),
      ...mainFiles.map(file => `/uploads/${file.filename}`)
    ];

    // Process writers data
    let writers = [];
    try {
      writers = JSON.parse(writersInfo || '[]').map((writer, index) => ({
        name: writer.name,
        role: writer.role,
        photoUrl: writerPhotos[index] ? `/uploads/${writerPhotos[index].filename}` : null
      }));
    } catch (err) {
      console.error('Error parsing writers info:', err);
      return res.status(400).json({
        success: false,
        message: 'Invalid writers data format'
      });
    }

    // Prepare content data
    const contentData = {
      title,
      description,
      type,
      category,
      files: fileUrls.map(url => ({
        url,
        fileType: getFileTypeFromUrl(url),
        originalName: getOriginalName(req.files, url),
        size: getFileSize(req.files, url),
        uploadedAt: new Date()
      })),
      writers,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to database
    const content = await Content.create(contentData);

    return res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content
    });

  } catch (err) {
    console.error('Create content error:', err);

    // Cleanup uploaded files if error occurs
    if (req.files) {
      const filesToDelete = [
        ...(req.files['file'] || []).map(f => `/uploads/${f.filename}`),
        ...(req.files['writers[0][photo]'] || []).map(f => `/uploads/${f.filename}`)
      ];
      await deleteFilesIfExist(filesToDelete);
    }

    // Handle specific error types
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Content with this title already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get All Content
const getAllContent = async (req, res) => {
  try {
    const { type, category, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    // Build filter
    if (type && Object.keys(FILE_TYPES).includes(type)) filter.type = type;
    if (category && mongoose.isValidObjectId(category)) filter.category = category;

    // Pagination
    const total = await Content.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const results = await Content.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: results.length,
      page: Number(page),
      totalPages,
      total,
      data: results
    });

  } catch (err) {
    console.error('Get all content error:', err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve content"
    });
  }
};

// Get Content By ID
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID format"
      });
    }

    const content = await Content.findById(id).populate('category');
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: content
    });

  } catch (err) {
    console.error('Get content by ID error:', err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve content"
    });
  }
};

// Update Content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;
    const mainFiles = req.files?.['file'] || [];
    const writerPhotos = req.files?.['writers[0][photo]'] || [];

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      await deleteFilesIfExist(mainFiles.map(f => `/uploads/${f.filename}`));
      await deleteFilesIfExist(writerPhotos.map(f => `/uploads/${f.filename}`));
      return res.status(400).json({
        success: false,
        message: "Invalid content ID"
      });
    }

    // Find existing content
    const existingContent = await Content.findById(id);
    if (!existingContent) {
      await deleteFilesIfExist(mainFiles.map(f => `/uploads/${f.filename}`));
      await deleteFilesIfExist(writerPhotos.map(f => `/uploads/${f.filename}`));
      return res.status(404).json({
        success: false,
        message: "Content not found"
      });
    }

    // Process writers data
    let writers = [];
    try {
      writers = JSON.parse(writersInfo || '[]').map((writer, index) => {
        const existingWriter = existingContent.writers[index] || {};
        return {
          name: writer.name || existingWriter.name,
          role: writer.role || existingWriter.role,
          photoUrl: writerPhotos[index] 
            ? `/uploads/${writerPhotos[index].filename}`
            : existingWriter.photoUrl
        };
      });
    } catch (err) {
      console.error('Error parsing writers info:', err);
      return res.status(400).json({
        success: false,
        message: 'Invalid writers data format'
      });
    }

    // Prepare update data
    const updateData = {
      title: title || existingContent.title,
      description: description || existingContent.description,
      type: type || existingContent.type,
      category: category || existingContent.category,
      writers,
      updatedAt: new Date()
    };

    // Handle file updates
    if (mainFiles.length > 0 || existingFileUrls) {
      // Delete old files that are being replaced
      const filesToDelete = existingContent.files
        .map(f => f.url)
        .filter(url => !existingFileUrls?.includes(url));
      
      await deleteFilesIfExist(filesToDelete);

      // Set new files
      updateData.files = [
        ...(existingFileUrls?.split(',') || []),
        ...mainFiles.map(file => ({
          url: `/uploads/${file.filename}`,
          fileType: getFileTypeFromUrl(file.originalname),
          originalName: file.originalname,
          size: file.size,
          uploadedAt: new Date()
        }))
      ];
    }

    // Perform update
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category');

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: updatedContent
    });

  } catch (err) {
    console.error('Update content error:', err);

    // Cleanup uploaded files if error occurs
    if (req.files) {
      const filesToDelete = [
        ...(req.files['file'] || []).map(f => `/uploads/${f.filename}`),
        ...(req.files['writers[0][photo]'] || []).map(f => `/uploads/${f.filename}`)
      ];
      await deleteFilesIfExist(filesToDelete);
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map(e => e.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update content"
    });
  }
};

// Delete Content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID"
      });
    }

    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found"
      });
    }

    // Cleanup files
    const filesToDelete = content.files.map(f => f.url);
    await deleteFilesIfExist(filesToDelete);

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully"
    });

  } catch (err) {
    console.error('Delete content error:', err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete content"
    });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent
};