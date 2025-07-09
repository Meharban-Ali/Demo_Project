const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

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

const getFileTypeFromUrl = (url) => {
  const ext = path.extname(url).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return 'image';
  if (['.mp4', '.webm'].includes(ext)) return 'video';
  if (['.mp3', '.wav', '.m4a'].includes(ext)) return 'audio';
  return 'other';
};

const createContent = async (req, res) => {
  try {
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;

    if (!title || !description || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type and category are required'
      });
    }

    // ✅ Extract uploaded main content files
    const mainFiles = req.files?.filter(f => f.fieldname === 'files') || [];

    // ✅ Extract writer photo files
    const writerPhotos = req.files?.filter(f => f.fieldname.startsWith('writers[') && f.fieldname.endsWith('[photo]')) || [];

    // ✅ Merge existing files and new uploaded files
    const fileUrls = [
      ...(existingFileUrls?.split(',') || []),
      ...mainFiles.map(file => `/api/uploads/${file.filename}`)
    ];

    // ✅ Parse writersInfo JSON
    let writers = [];
    try {
      const parsed = JSON.parse(writersInfo || '[]');
      if (!Array.isArray(parsed)) throw new Error('Invalid format');

      writers = parsed.map((writer, index) => ({
        name: writer.name || '',
        role: writer.role || '',
        photoUrl: writerPhotos[index] ? `/api/uploads/${writerPhotos[index].filename}` : null
      }));
    } catch (err) {
      console.error('Error parsing writersInfo:', err);
      return res.status(400).json({
        success: false,
        message: 'Invalid writers data format'
      });
    }

    // ✅ Prepare file metadata for DB
    const filesWithMeta = fileUrls.map(url => {
      const filename = path.basename(url);
      const file = req.files?.find(f => f.filename === filename);

      return {
        url,
        fileType: getFileTypeFromUrl(url),
        originalName: file?.originalname || filename,
        size: file?.size || 0,
        uploadedAt: new Date()
      };
    });

    // ✅ Create content in DB
    const newContent = await Content.create({
      title,
      description,
      type,
      category,
      writers,
      files: filesWithMeta
    });

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent
    });
  } catch (err) {
    console.error('Create content error:', err);

    const toDelete = req.files?.map(f => `/api/uploads/${f.filename}`) || [];
    await deleteFilesIfExist(toDelete);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// ==========================
// Other functions (as is)
// ==========================

const getAllContent = async (req, res) => {
  try {
    const { type, category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (category && mongoose.isValidObjectId(category)) filter.category = category;

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

const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid content ID" });
    }

    const content = await Content.findById(id).populate('category');
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.status(200).json({ success: true, data: content });
  } catch (err) {
    console.error('Get content by ID error:', err);
    return res.status(500).json({ success: false, message: "Failed to retrieve content" });
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid content ID" });
    }

    const existingContent = await Content.findById(id);
    if (!existingContent) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    const mainFiles = req.files?.filter(f => f.fieldname === 'files') || [];
    const writerPhotos = req.files?.filter(f => f.fieldname.startsWith('writers[')) || [];

    let writers = [];
    try {
      const parsed = JSON.parse(writersInfo || '[]');
      writers = parsed.map((writer, index) => ({
        name: writer.name || '',
        role: writer.role || '',
        photoUrl: writerPhotos[index] ? `/api/uploads/${writerPhotos[index].filename}` : existingContent.writers[index]?.photoUrl || null
      }));
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid writers data format' });
    }

    const filesToKeep = existingFileUrls?.split(',') || [];
    const filesToDelete = existingContent.files.map(f => f.url).filter(url => !filesToKeep.includes(url));
    await deleteFilesIfExist(filesToDelete);

    const updatedFiles = [
      ...filesToKeep.map(url => {
        const filename = path.basename(url);
        const existing = existingContent.files.find(f => f.url === url);
        return {
          url,
          fileType: getFileTypeFromUrl(url),
          originalName: existing?.originalName || filename,
          size: existing?.size || 0,
          uploadedAt: existing?.uploadedAt || new Date()
        };
      }),
      ...mainFiles.map(file => ({
        url: `/api/uploads/${file.filename}`,
        fileType: getFileTypeFromUrl(file.originalname),
        originalName: file.originalname,
        size: file.size,
        uploadedAt: new Date()
      }))
    ];

    const updated = await Content.findByIdAndUpdate(id, {
      title,
      description,
      type,
      category,
      writers,
      files: updatedFiles,
      updatedAt: new Date()
    }, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: updated
    });

  } catch (err) {
    console.error('Update content error:', err);
    const toDelete = req.files?.map(f => `/api/uploads/${f.filename}`) || [];
    await deleteFilesIfExist(toDelete);

    return res.status(500).json({
      success: false,
      message: "Failed to update content"
    });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid content ID" });
    }

    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    await deleteFilesIfExist(content.files.map(f => f.url));

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
