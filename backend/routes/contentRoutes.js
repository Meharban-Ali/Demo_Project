const express = require('express');
const {
  createContent,
  getAllContent,
  deleteContent,
  updateContent,
  getContentById,
} = require('../controllers/contentController');

const { 
  createContentUpload,
  handleMulterErrors,
  cleanupOnError,
} = require('../middleware/upload');

const { validateContent, validateContentUpdate } = require('../middleware/validation');
const Content = require('../models/Content');

const router = express.Router();

/**
 * ✅ Middleware for creating new content
 */
const uploadMiddleware = [
  createContentUpload(),   // <-- Function ko call kiya
  handleMulterErrors,
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

      req.contentType = req.body.type || existingContent.type || 'blog';

      let existingFileUrls = [];
      if (req.body.existingFileUrls) {
        try {
          existingFileUrls = JSON.parse(req.body.existingFileUrls);
          if (!Array.isArray(existingFileUrls)) {
            throw new Error('Invalid existingFileUrls format');
          }
        } catch (parseErr) {
          return res.status(400).json({
            success: false,
            message: 'Invalid existingFileUrls format'
          });
        }
      }

      const hasNewFiles = req.files && (req.files.files || req.files['files[]']) && 
        (req.files.files.length > 0 || req.files['files[]'].length > 0);
      const hasExistingFiles = existingFileUrls.length > 0;

      if (!hasNewFiles && !hasExistingFiles && req.contentType !== 'blog') {
        return res.status(400).json({
          success: false,
          message: 'कृपया फाइल अपडेट करें या मौजूदा फाइल को रखें | Please update file or keep existing file'
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  },
  createContentUpload(),  // <-- Function call added here too
  handleMulterErrors,
  validateContentUpdate
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
  
  // Make sure we always send a response
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: messageObj[lang],
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      errorType: err.errorType
    });
  }
});

module.exports = router;
