const Content = require('../models/Content');
const fs = require('fs').promises;
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
        await fs.access(fullPath);
        await fs.unlink(fullPath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('Error deleting file:', err);
        }
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

const safeJsonParse = (data, fallback = []) => {
  try {
    const parsed = JSON.parse(data || '[]');
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

/* -------------------- CREATE CONTENT -------------------- */
const createContent = async (req, res) => {
  try {
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;

    if (!title || !description || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type and category are required'
      });
    }

    const mainFiles = req.files?.files || req.files?.['files[]'] || [];

    const writerPhotos = [];
    Object.keys(req.files || {})
      .filter(key => key.startsWith('writers[') && key.endsWith('[photo]'))
      .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
      .forEach(key => {
        if (req.files[key]?.[0]) writerPhotos.push(req.files[key][0]);
      });

    const parsedExistingFileUrls = safeJsonParse(existingFileUrls, []);
    const fileUrls = [
      ...parsedExistingFileUrls,
      ...mainFiles.map(file => `/api/uploads/${file.filename}`)
    ];

    let writers = safeJsonParse(writersInfo, null);
    if (writers === null) {
      await deleteFilesIfExist(mainFiles.map(f => `/api/uploads/${f.filename}`));
      return res.status(400).json({ success: false, message: 'Invalid writers data format' });
    }

    writers = writers.map((writer, index) => ({
      name: writer.name || '',
      role: writer.role || '',
      photoUrl: writerPhotos[index]
        ? `/api/uploads/${writerPhotos[index].filename}`
        : writer.photoUrl || null
    }));

    const filesWithMeta = fileUrls.map(url => {
      const filename = path.basename(url);
      const uploadedFile = mainFiles.find(f => f.filename === filename);
      return {
        url,
        fileType: getFileTypeFromUrl(url),
        originalName: uploadedFile?.originalname || filename,
        size: uploadedFile?.size || 0,
        uploadedAt: new Date()
      };
    });

    const newContent = await Content.create(
      [{ title, description, type, category, writers, files: filesWithMeta }],
      { maxTimeMS: 20000 }
    );

    return res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent[0]
    });
  } catch (err) {
    console.error('Create content error:', err);
    const toDelete = req.files
      ? Object.values(req.files).flat().map(file => `/api/uploads/${file.filename}`)
      : [];
    await deleteFilesIfExist(toDelete);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/* -------------------- GET ALL CONTENT (Fetch All Without Pagination) -------------------- */
const getAllContent = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (category && mongoose.isValidObjectId(category)) filter.category = category;

    const results = await Content.find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .maxTimeMS(20000);

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('Get all content error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve content'
    });
  }
};

/* -------------------- GET CONTENT BY ID -------------------- */
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content ID' });
    }

    const content = await Content.findById(id).populate('category').maxTimeMS(20000);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    return res.status(200).json({ success: true, data: content });
  } catch (err) {
    console.error('Get content by ID error:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve content' });
  }
};

/* -------------------- UPDATE CONTENT -------------------- */
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, category, writersInfo, existingFileUrls } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content ID' });
    }

    const existingContent = await Content.findById(id).maxTimeMS(20000);
    if (!existingContent) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    const mainFiles = req.files?.files || req.files?.['files[]'] || [];
    const writerPhotos = [];
    Object.keys(req.files || {})
      .filter(key => key.startsWith('writers[') && key.endsWith('[photo]'))
      .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
      .forEach(key => {
        if (req.files[key]?.[0]) writerPhotos.push(req.files[key][0]);
      });

    let writers = safeJsonParse(writersInfo, null);
    if (writers === null) {
      await deleteFilesIfExist(mainFiles.map(f => `/api/uploads/${f.filename}`));
      return res.status(400).json({ success: false, message: 'Invalid writers data format' });
    }

    writers = writers.map((writer, index) => ({
      name: writer.name || '',
      role: writer.role || '',
      photoUrl: writerPhotos[index]
        ? `/api/uploads/${writerPhotos[index].filename}`
        : existingContent.writers[index]?.photoUrl || null
    }));

    const parsedExistingFileUrls = safeJsonParse(existingFileUrls, []);
    const filesToKeep = parsedExistingFileUrls;
    const filesToDelete = existingContent.files
      .map(f => f.url)
      .filter(url => !filesToKeep.includes(url));
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

    const updated = await Content.findByIdAndUpdate(
      id,
      { title, description, type, category, writers, files: updatedFiles, updatedAt: new Date() },
      { new: true, maxTimeMS: 20000 }
    );

    return res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Update content error:', err);
    const toDelete = req.files
      ? Object.values(req.files).flat().map(file => `/api/uploads/${file.filename}`)
      : [];
    await deleteFilesIfExist(toDelete);
    return res.status(500).json({ success: false, message: 'Failed to update content' });
  }
};

/* -------------------- DELETE CONTENT -------------------- */
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content ID' });
    }

    const content = await Content.findByIdAndDelete(id).maxTimeMS(20000);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    await deleteFilesIfExist(content.files.map(f => f.url));
    return res.status(200).json({ success: true, message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Delete content error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete content' });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent
};
