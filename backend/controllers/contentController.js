const Content = require('../models/Content');
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

const UPLOADS_DIR = path.join(__dirname, '..', 'Uploads');

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
        console.log(`Deleted file: ${fullPath}`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error(`Error deleting file ${url}:`, err.message);
        }
      }
    })
  );
};

const getFileTypeFromUrl = (url) => {
  const ext = path.extname(url).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) return 'image';
  if (['.mp4', '.webm', '.mov'].includes(ext)) return 'video';
  if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) return 'audio';
  return 'other';
};

const safeJsonParse = (data, fallback = null) => {
  if (!data || data === '[]' || data === '') return fallback;
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.error('JSON parse error:', err.message, 'Input:', data);
    return fallback;
  }
};

/* -------------------- CREATE CONTENT -------------------- */
const createContent = async (req, res) => {
  try {
    const { title, description, type, category, existingFileUrls } = req.body;
    const writersRaw = req.body.writersInfo || req.body.writers || null;


    console.log('Received body:', req.body);
    console.log('Received files:', req.files);

    if (!title || !description || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type, and category are required',
      });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID',
      });
    }

    if (!writersRaw) {
      return res.status(400).json({
        success: false,
        message: 'Writers data is required for new content',
      });
    }

    const mainFiles = req.files?.files || req.files?.['files[]'] || [];
    console.log('Main files:', mainFiles.map(f => ({ filename: f.filename, originalname: f.originalname })));

    const writerPhotos = [];
    Object.keys(req.files || {})
      .filter((key) => key.startsWith('writers[') && key.endsWith('[photo]'))
      .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
      .forEach((key) => {
        if (req.files[key]?.[0]) writerPhotos.push(req.files[key][0]);
      });
    console.log('Writer photos:', writerPhotos.map(f => ({ filename: f.filename, originalname: f.originalname })));

    const parsedExistingFileUrls = safeJsonParse(existingFileUrls, []);
    const fileUrls = [
      ...parsedExistingFileUrls,
      ...mainFiles.map((file) => `/api/uploads/${file.filename}`),
    ];
    console.log('File URLs:', fileUrls);

    let writers = safeJsonParse(writersRaw, null);
    console.log('Parsed writers:', writers);
    if (writers === null) {
      await deleteFilesIfExist(mainFiles.map((f) => `/api/uploads/${f.filename}`));
      return res.status(400).json({
        success: false,
        message: 'Invalid writers data format',
      });
    }

    if (writers.length === 0) {
      await deleteFilesIfExist(mainFiles.map((f) => `/api/uploads/${f.filename}`));
      return res.status(400).json({
        success: false,
        message: 'At least one writer is required for new content',
      });
    }

    writers = writers.map((writer, index) => {
      if (!writer.name || typeof writer.name !== 'string' || writer.name.trim() === '') {
        throw new Error(`Invalid or missing name for writer at index ${index}`);
      }
      return {
        name: writer.name.trim(),
        role: typeof writer.role === 'string' ? writer.role.trim() : '',
        photoUrl: writerPhotos[index]
          ? `/api/uploads/${writerPhotos[index].filename}`
          : writer.photoUrl && typeof writer.photoUrl === 'string'
          ? writer.photoUrl
          : '',
      };
    });
    console.log('Processed writers:', writers);

    const filesWithMeta = fileUrls.map((url) => {
      const filename = path.basename(url);
      const uploadedFile = mainFiles.find((f) => f.filename === filename);
      return {
        url,
        fileType: getFileTypeFromUrl(url),
        originalName: uploadedFile?.originalname || filename,
        size: uploadedFile?.size || 0,
        uploadedAt: new Date(),
      };
    });
    console.log('Files with metadata:', filesWithMeta);

    const newContent = await Content.create(
      [{ title, description, type, category, writers, files: filesWithMeta }],
      { maxTimeMS: 20000 }
    );
    console.log('Saved content:', newContent[0]);

    return res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent[0],
    });
  } catch (err) {
    console.error('Create content error:', err.message, err.stack);
    const toDelete = req.files
      ? Object.values(req.files)
          .flat()
          .map((file) => `/api/uploads/${file.filename}`)
      : [];
    await deleteFilesIfExist(toDelete);
    return res.status(500).json({
      success: false,
      message: err.name === 'ValidationError' ? `Validation error: ${err.message}` : 'Internal server error',
    });
  }
};

/* -------------------- GET ALL CONTENT -------------------- */
/* -------------------- GET ALL CONTENT -------------------- */
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

    console.log('Fetched content count:', results.length);

    // ✅ Normalize response
    const baseUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const formatted = results.map(item => {
      let audioUrl = null;

      if (item.files?.length > 0 && item.files[0].url) {
        audioUrl = `${baseUrl}${item.files[0].url}`;
      } else if (item.fileUrls?.length > 0) {
        audioUrl = `${baseUrl}${item.fileUrls[0]}`;
      } else if (item.url) {
        audioUrl = `${baseUrl}${item.url}`;
      }

      return {
        ...item.toObject(),
        audioUrl, // ✅ ek consistent field frontend ke liye
      };
    });

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    console.error('Get all content error:', err.message, err.stack);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve content',
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

    console.log('Fetched content by ID:', content._id);
    return res.status(200).json({ success: true, data: content });
  } catch (err) {
    console.error('Get content by ID error:', err.message, err.stack);
    return res.status(500).json({ success: false, message: 'Failed to retrieve content' });
  }
};

/* -------------------- UPDATE CONTENT -------------------- */
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, category, existingFileUrls } = req.body;
    const writersRaw = req.body.writers || req.body.writersInfo || null;

    console.log('Update received body:', req.body);
    console.log('Update received files:', req.files);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid content ID' });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const existingContent = await Content.findById(id).maxTimeMS(20000);
    if (!existingContent) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    const mainFiles = req.files?.files || req.files?.['files[]'] || [];
    console.log('Update main files:', mainFiles.map(f => ({ filename: f.filename, originalname: f.originalname })));

    const writerPhotos = [];
    Object.keys(req.files || {})
      .filter((key) => key.startsWith('writers[') && key.endsWith('[photo]'))
      .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
      .forEach((key) => {
        if (req.files[key]?.[0]) writerPhotos.push(req.files[key][0]);
      });
    console.log('Update writer photos:', writerPhotos.map(f => ({ filename: f.filename, originalname: f.originalname })));

    let writers = safeJsonParse(writersRaw, null);
    console.log('Update parsed writers:', writers);
    if (writers === null) {
      await deleteFilesIfExist(mainFiles.map((f) => `/api/uploads/${f.filename}`));
      return res.status(400).json({
        success: false,
        message: 'Invalid writers data format',
      });
    }

    writers = writers.map((writer, index) => {
      if (!writer.name || typeof writer.name !== 'string' || writer.name.trim() === '') {
        throw new Error(`Invalid or missing name for writer at index ${index}`);
      }
      return {
        name: writer.name.trim(),
        role: typeof writer.role === 'string' ? writer.role.trim() : '',
        photoUrl: writerPhotos[index]
          ? `/api/uploads/${writerPhotos[index].filename}`
          : writer.photoUrl && typeof writer.photoUrl === 'string'
          ? writer.photoUrl
          : existingContent.writers[index]?.photoUrl || '',
      };
    });
    console.log('Update processed writers:', writers);

    const parsedExistingFileUrls = safeJsonParse(existingFileUrls, []);
    const filesToKeep = parsedExistingFileUrls;
    const filesToDelete = existingContent.files
      .map((f) => f.url)
      .filter((url) => !filesToKeep.includes(url));
    await deleteFilesIfExist(filesToDelete);
    console.log('Files to delete:', filesToDelete);

    const updatedFiles = [
      ...filesToKeep.map((url) => {
        const filename = path.basename(url);
        const existing = existingContent.files.find((f) => f.url === url);
        return {
          url,
          fileType: getFileTypeFromUrl(url),
          originalName: existing?.originalName || filename,
          size: existing?.size || 0,
          uploadedAt: existing?.uploadedAt || new Date(),
        };
      }),
      ...mainFiles.map((file) => ({
        url: `/api/uploads/${file.filename}`,
        fileType: getFileTypeFromUrl(file.originalname),
        originalName: file.originalname,
        size: file.size,
        uploadedAt: new Date(),
      })),
    ];
    console.log('Update files with metadata:', updatedFiles);

    const updated = await Content.findByIdAndUpdate(
      id,
      { title, description, type, category, writers, files: updatedFiles, updatedAt: new Date() },
      { new: true, maxTimeMS: 20000 }
    );

    console.log('Updated content:', updated);
    return res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: updated,
    });
  } catch (err) {
    console.error('Update content error:', err.message, err.stack);
    const toDelete = req.files
      ? Object.values(req.files)
          .flat()
          .map((file) => `/api/uploads/${file.filename}`)
      : [];
    await deleteFilesIfExist(toDelete);
    return res.status(500).json({
      success: false,
      message: err.name === 'ValidationError' ? `Validation error: ${err.message}` : 'Failed to update content',
    });
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

    await deleteFilesIfExist(content.files.map((f) => f.url));
    console.log('Deleted content:', id);
    return res.status(200).json({ success: true, message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Delete content error:', err.message, err.stack);
    return res.status(500).json({ success: false, message: 'Failed to delete content' });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
};
