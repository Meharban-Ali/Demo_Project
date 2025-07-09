const express = require('express');
const {
  createContent,
  getAllContent,
  deleteContent,
  updateContent,
  getContentById,
} = require('../controllers/contentController');

const { 
  createContentUpload, // ✅ multer.any() as middleware
  handleMulterErrors,
  cleanupOnError,
} = require('../middleware/upload');

const { validateContent } = require('../middleware/validation');
const Content = require('../models/Content');

const router = express.Router();

/**
 * ✅ Middleware for creating new content
 */
const uploadMiddleware = [
  (req, res, next) => {
    createContentUpload(req, res, (err) => {
      if (err) return handleMulterErrors(err, req, res, next);

      const contentType = req.query.type || req.body.type || 'blog';

      // ✅ Check if at least one file uploaded (except for blog)
      const hasFiles = req.files?.some(f => f.fieldname === 'files');
      if (!hasFiles && contentType !== 'blog') {
        return res.status(400).json({
          success: false,
          message: 'कृपया कम से कम एक फाइल चुनें | Please select at least one file.'
        });
      }

      next();
    });
  },
  validateContent
];

/**
 * ✅ Middleware for updating content
 */
const updateMiddleware = [
  async (req, res, next) => {
    try {
      const existingContent = await Content.findById(req.params.id);
      if (!existingContent) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      req.contentType = req.query.type || req.body.type || existingContent.type || 'blog';

      createContentUpload(req, res, (err) => {
        if (err) return handleMulterErrors(err, req, res, next);

        const hasNewFiles = req.files?.some(f => f.fieldname === 'files');
        const existingFileUrls = req.body.existingFileUrls?.split(',') || [];
        const hasExistingFiles = existingFileUrls.length > 0;

        if (!hasNewFiles && !hasExistingFiles && req.contentType !== 'blog') {
          return res.status(400).json({
            success: false,
            message: 'कृपया फाइल अपडेट करें या मौजूदा फाइल को रखें | Please update file or keep existing file'
          });
        }

        next();
      });
    } catch (err) {
      next(err);
    }
  },
  validateContent
];

// ✅ Routes
router.post('/', ...uploadMiddleware, createContent, cleanupOnError);
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.put('/:id', ...updateMiddleware, updateContent, cleanupOnError);
router.delete('/:id', deleteContent);

// ✅ Global Error Handler
router.use((err, req, res, next) => {
  console.error('Route error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    body: req.body,
    files: req.files
  });

  const messages = {
    VALIDATION_ERROR: {
      en: 'Validation failed',
      hi: 'डेटा अमान्य है'
    },
    default: {
      en: 'Internal server error',
      hi: 'सर्वर में समस्या आई है'
    }
  };

  const lang = req.acceptsLanguages('hi') ? 'hi' : 'en';
  const messageObj = messages[err.errorType] || messages.default;
  
  res.status(err.status || 500).json({
    success: false,
    message: messageObj[lang],
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    errorType: err.errorType
  });
});

module.exports = router;
