const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

// Ensure uploads directory exists (run once at startup)
const uploadDir = path.join(__dirname, '..', 'uploads');
(async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Uploads directory ensured: ${uploadDir}`);
  } catch (err) {
    console.error(`Failed to create uploads directory: ${err.message}`);
  }
})();

// Unique file name generator
const generateFilename = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueSuffix = crypto.randomBytes(8).toString('hex');
  return `${uniqueSuffix}-${Date.now()}${ext}`;
};

// Supported content types with rules (for reference, validation in contentValidation.js)
const contentConfig = {
  blog: {
    maxFiles: 5,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  },
  news: {
    maxFiles: 5,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  },
  video: {
    maxFiles: 1,
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
    extensions: ['.mp4', '.webm', '.mov'],
  },
  audio: {
    maxFiles: 1,
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    extensions: ['.mp3', '.wav', '.ogg'],
  },
};

// Multer disk storage config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    console.log(`Processing file: ${file.originalname}, field: ${file.fieldname}, size: ${file.size} bytes`);
    cb(null, generateFilename(file));
  },
});

const MAX_FILE_SIZE_MB = 100;

// Main upload middleware
const createContentUpload = () =>
  multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE_MB * 1024 * 1024, // 100MB
      files: 9, // 5 main files + 4 writer photos
      fieldNameSize: 100, // Max field name size
      fieldSize: 1024 * 1024, // Max field value size (1MB)
    },
  }).fields([
    { name: 'files', maxCount: 5 },
    { name: 'files[]', maxCount: 5 },
    { name: 'writers[0][photo]', maxCount: 1 },
    { name: 'writers[1][photo]', maxCount: 1 },
    { name: 'writers[2][photo]', maxCount: 1 },
    { name: 'writers[3][photo]', maxCount: 1 },
  ]);

// Multer error handler middleware
const handleMulterErrors = (err, req, res, next) => {
  console.error('Multer error:', {
    message: err.message,
    code: err.code,
    field: err.field,
    body: req.body,
    files: req.files,
    headers: {
      contentType: req.headers['content-type'],
      contentLength: req.headers['content-length'],
    },
  });

  const messages = {
    LIMIT_FILE_SIZE: {
      en: `File too large. Max size: ${MAX_FILE_SIZE_MB}MB.`,
      hi: `फाइल का आकार बहुत बड़ा है। अधिकतम आकार: ${MAX_FILE_SIZE_MB}MB.`,
    },
    LIMIT_FILE_COUNT: {
      en: 'Too many files uploaded.',
      hi: 'बहुत अधिक फाइलें अपलोड की गईं।',
    },
    LIMIT_UNEXPECTED_FILE: {
      en: 'Unexpected file field detected.',
      hi: 'अनपेक्षित फाइल फील्ड मिला।',
    },
    LIMIT_PART_COUNT: {
      en: 'Too many form parts.',
      hi: 'फॉर्म में बहुत सारे हिस्से।',
    },
    LIMIT_FIELD_COUNT: {
      en: 'Too many form fields.',
      hi: 'फॉर्म में बहुत सारे फील्ड।',
    },
    LIMIT_FIELD_KEY: {
      en: 'Form field name too long.',
      hi: 'फॉर्म फील्ड का नाम बहुत लंबा है।',
    },
    LIMIT_FIELD_VALUE: {
      en: 'Form field value too large.',
      hi: 'फॉर्म फील्ड का मान बहुत बड़ा है।',
    },
    ENOENT: {
      en: 'Incomplete or corrupted form data. Please check your submission.',
      hi: 'अपूर्ण या दूषित फॉर्म डेटा। कृपया अपनी सबमिशन जांचें।',
    },
  };

  if (err instanceof multer.MulterError || err.code === 'ENOENT') {
    const lang = req.acceptsLanguages('hi') ? 'hi' : 'en';
    const message = messages[err.code]?.[lang] || err.message;

    res.status(400).json({
      success: false,
      error: {
        message,
        param: err.field || 'form',
        location: 'body',
      },
    });
    return;
  }

  if (err) {
    res.status(400).json({
      success: false,
      error: {
        message: err.message,
        param: 'form',
        location: 'body',
      },
    });
    return;
  }

  next();
};

// Cleanup uploaded files on error
const cleanupOnError = async (req, res, next) => {
  if (req.files && Object.keys(req.files).length > 0) {
    try {
      // Flatten all files from req.files object
      const files = [
        ...(req.files['files'] || []),
        ...(req.files['files[]'] || []),
        ...(Object.keys(req.files)
          .filter(key => key.startsWith('writers['))
          .flatMap(key => req.files[key])),
      ];

      if (files.length > 0) {
        console.log(`Cleaning up ${files.length} files`);
        await Promise.all(
          files.map(async (file) => {
            const fullPath = path.join(uploadDir, file.filename);
            try {
              if (await fs.access(fullPath).then(() => true).catch(() => false)) {
                await fs.unlink(fullPath);
                console.log(`Deleted file: ${fullPath}`);
              } else {
                console.log(`File not found for deletion: ${fullPath}`);
              }
            } catch (unlinkErr) {
              console.error(`Failed to delete file ${fullPath}: ${unlinkErr.message}`);
            }
          })
        );
      } else {
        console.log('No files to clean up (empty file arrays)');
      }
    } catch (cleanupErr) {
      console.error('Cleanup failed:', cleanupErr.message);
    }
  } else {
    console.log('No files to clean up (req.files empty or undefined)');
  }
  next();
};

// Exports
module.exports = {
  createContentUpload,
  handleMulterErrors,
  cleanupOnError,
  contentConfig,
  uploadDir,
};