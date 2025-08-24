const path = require('path');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Hindi error messages
const errorMessages = {
  FILE_TYPE: (type) => {
    const types = {
      blog: 'केवल JPG, JPEG, PNG, WEBP, GIF इमेज फाइलें चाहिए',
      news: 'केवल JPG, JPEG, PNG, WEBP, GIF इमेज फाइलें चाहिए',
      video: 'केवल MP4, WEBM, MOV वीडियो फाइलें चाहिए',
      audio: 'केवल MP3, WAV, OGG ऑडियो फाइलें चाहिए'
    };
    return types[type] || 'अमान्य फाइल प्रकार';
  },
  FILE_SIZE: 'फाइल का आकार 100MB से अधिक नहीं होना चाहिए',
  INVALID_CONTENT_TYPE: 'अमान्य कंटेंट प्रकार'
};

// Allowed file types
const ALLOWED_FILE_TYPES = {
  blog: {
    ext: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    mime: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  news: {
    ext: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    mime: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  video: {
    ext: ['.mp4', '.webm', '.mov'],
    mime: ['video/mp4', 'video/webm', 'video/quicktime']
  },
  audio: {
    ext: ['.mp3', '.wav', '.ogg'],
    mime: ['audio/mpeg', 'audio/wav', 'audio/ogg']
  }
};

// ✅ Main validation middleware
exports.validateContent = [
  // 1. Validate fields
  body('title')
    .trim()
    .notEmpty().withMessage('शीर्षक आवश्यक है')
    .isLength({ min: 3, max: 100 }).withMessage('शीर्षक 3 से 100 अक्षरों का होना चाहिए')
    .escape(),

  body('description')
    .trim()
    .notEmpty().withMessage('विवरण आवश्यक है')
    .isLength({ max: 100000 }).withMessage('विवरण 1-Lakh अक्षरों से कम होना चाहिए')
    .custom(value => {
      if (/<[^>]+>/g.test(value)) {
        throw new Error('विवरण में HTML टैग्स की अनुमति नहीं है');
      }
      return true;
    }),

  body('category')
    .notEmpty().withMessage('श्रेणी आवश्यक है')
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('अमान्य श्रेणी ID प्रारूप');
      }
      return true;
    }),

  body('type')
    .trim()
    .toLowerCase()
    .isIn(['blog', 'news', 'video', 'audio'])
    .withMessage('अमान्य कंटेंट प्रकार'),

  // 2. Custom file validation (after multer)
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          param: err.param,
          message: err.msg,
          location: err.location
        }))
      });
    }

    const contentType = req.body.type?.toLowerCase();
    const fileArray = req.files?.files;
    const file = Array.isArray(fileArray) && fileArray.length > 0 ? fileArray[0] : null;

    // 🔹 Case: File is optional, but if provided then validate it
    if (file) {
      const ext = path.extname(file.originalname).toLowerCase();
      const mime = file.mimetype;
      const allowed = ALLOWED_FILE_TYPES[contentType];

      if (!allowed.ext.includes(ext) || !allowed.mime.includes(mime)) {
        return res.status(400).json({
          success: false,
          error: {
            message: errorMessages.FILE_TYPE(contentType),
            param: 'files',
            location: 'body'
          }
        });
      }

      if (file.size > 100 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          error: {
            message: errorMessages.FILE_SIZE,
            param: 'files',
            location: 'body'
          }
        });
      }
    }

    next();
  }
];

// ✅ Optional update validation (used in PUT route)
exports.validateContentUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('शीर्षक 3 से 100 अक्षरों का होना चाहिए')
    .escape(),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 100000 }).withMessage('विवरण 1-Lakh अक्षरों से कम होना चाहिए'),

  body('type')
    .optional()
    .trim()
    .toLowerCase()
    .isIn(['blog', 'news', 'video', 'audio'])
    .withMessage('अमान्य कंटेंट प्रकार'),

  body('category')
    .optional()
    .custom(value => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('अमान्य श्रेणी ID प्रारूप');
      }
      return true;
    })
];
