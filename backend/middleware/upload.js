const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Generate unique filename
const generateFilename = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueSuffix = crypto.randomBytes(8).toString('hex');
  return `${uniqueSuffix}-${Date.now()}${ext}`;
};

// ✅ Content type specific configurations
const contentConfig = {
  blog: {
    maxFiles: 5,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp']
  },
  news: {
    maxFiles: 5,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp']
  },
  video: {
    maxFiles: 1,
    mimeTypes: ['video/mp4', 'video/webm'],
    extensions: ['.mp4', '.webm']
  },
  audio: {
    maxFiles: 1,
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-m4a'],
    extensions: ['.mp3', '.wav', '.m4a']
  }
};

// ✅ File filter with content type awareness
const fileFilter = (contentType) => (req, file, cb) => {
  const config = contentConfig[contentType] || contentConfig.blog;
  
  if (!config.mimeTypes.includes(file.mimetype)) {
    const errorMsg = `अमान्य फाइल प्रकार। अनुमत प्रकार: ${config.extensions.join(', ')}`;
    return cb(new Error(errorMsg), false);
  }
  cb(null, true);
};

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, generateFilename(file))
});

// ✅ Constants
const MAX_FILE_SIZE_MB = 100;

// ✅ Updated content upload middleware to match frontend fields
const createContentUpload = (contentType) => {
  const config = contentConfig[contentType] || contentConfig.blog;
  
  return multer({
    storage,
    fileFilter: fileFilter(contentType),
    limits: {
      fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
      files: config.maxFiles + 4 // Main files + max writer photos
    }
  }).fields([
    { 
      name: 'file', // Changed from 'files' to match frontend
      maxCount: config.maxFiles 
    },
    { 
      name: 'writers[0][photo]', // Exactly matches frontend field name
      maxCount: 4 
    }
  ]);
};

// ✅ Enhanced error handling middleware
const handleMulterErrors = (err, req, res, next) => {
  const messages = {
    LIMIT_FILE_SIZE: {
      en: `File too large. Max size: ${MAX_FILE_SIZE_MB}MB.`,
      hi: `फाइल का आकार बहुत बड़ा है। अधिकतम आकार: ${MAX_FILE_SIZE_MB}MB.`
    },
    LIMIT_FILE_COUNT: {
      en: 'Too many files uploaded.',
      hi: 'बहुत अधिक फाइलें अपलोड की गईं।'
    },
    INVALID_FILE_TYPE: {
      en: 'Invalid file type.',
      hi: 'अमान्य फाइल प्रकार।'
    },
    UNEXPECTED_FIELD: {
      en: 'Unexpected file field detected.',
      hi: 'अनपेक्षित फाइल फील्ड मिला।'
    }
  };

  if (err instanceof multer.MulterError) {
    const lang = req.acceptsLanguages('hi') ? 'hi' : 'en';
    const message = messages[err.code]?.[lang] || err.message;
    
    return res.status(400).json({ 
      success: false, 
      message,
      errorType: err.code,
      expectedFields: ['file', 'writers[0][photo]'] // Updated field names
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      errorType: 'VALIDATION_ERROR'
    });
  }

  next();
};

// ✅ Updated cleanup middleware for new field names
const cleanupOnError = async (err, req, res, next) => {
  try {
    const files = req.files 
      ? [...(req.files.file || []), ...(req.files['writers[0][photo]'] || [])] 
      : [];
      
    await Promise.all(
      files.map(async (f) => {
        const fullPath = path.join(uploadDir, f.filename);
        if (fs.existsSync(fullPath)) {
          await fs.promises.unlink(fullPath);
        }
      })
    );
  } catch (cleanupErr) {
    console.error('Cleanup failed:', cleanupErr);
  }
  next(err);
};

// ✅ Export everything
module.exports = {
  createContentUpload,
  handleMulterErrors,
  cleanupOnError,
  contentConfig,
  uploadDir
};