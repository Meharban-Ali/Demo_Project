const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Unique file name generator
const generateFilename = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueSuffix = crypto.randomBytes(8).toString('hex');
  return `${uniqueSuffix}-${Date.now()}${ext}`;
};

// ✅ Supported content types with rules
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

// ✅ Multer file filter based on content type
const fileFilter = (req, file, cb) => {
  const contentType = req.query?.type || req.body?.type || 'blog';
  const config = contentConfig[contentType] || contentConfig.blog;

  if (!config.mimeTypes.includes(file.mimetype)) {
    const errorMsg = `अमान्य फाइल प्रकार (${file.originalname})। अनुमत प्रकार: ${config.extensions.join(', ')}`;
    return cb(new Error(errorMsg), false);
  }

  cb(null, true);
};

// ✅ Multer disk storage config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, generateFilename(file))
});

const MAX_FILE_SIZE_MB = 100;

// ✅ Main upload middleware
const createContentUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024, // 100MB
    files: 10 // 5 main + 4 writer photos + buffer
  }
}).any(); // ✅ Allow all dynamic fields (writers[0][photo], etc.)

// ✅ Multer error handler middleware
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
      errorType: err.code
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

// ✅ Cleanup uploaded files if any error occurs
const cleanupOnError = async (err, req, res, next) => {
  try {
    const files = req.files ? req.files : [];

    await Promise.all(
      files.map(async (f) => {
        const fullPath = path.join(uploadDir, f.filename);
        if (fs.existsSync(fullPath)) {
          await fs.promises.unlink(fullPath);
        }
      })
    );
  } catch (cleanupErr) {
    console.error('❌ Cleanup failed:', cleanupErr);
  }
  next(err);
};

// ✅ Exports
module.exports = {
  createContentUpload,
  handleMulterErrors,
  cleanupOnError,
  contentConfig,
  uploadDir
};
