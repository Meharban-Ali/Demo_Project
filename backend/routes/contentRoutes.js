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
  contentConfig
} = require('../middleware/upload');

const { validateContent } = require('../middleware/validation');
const Content = require('../models/Content'); // Make sure to import Content model

const router = express.Router();

/**
 * Middleware for creating new content
 */
const uploadMiddleware = [
  (req, res, next) => {
    const contentType = req.body.type || 'blog';
    const upload = createContentUpload(contentType);
    
    upload(req, res, (err) => {
      if (err) return handleMulterErrors(err, req, res, next);
      
      // Verify at least 1 content file for new uploads
      if (!req.files?.files?.length && contentType !== 'blog') {
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
 * Improved Middleware for updating content
 */
const updateMiddleware = [
  // First get existing content to determine type and check files
  async (req, res, next) => {
    try {
      const existingContent = await Content.findById(req.params.id);
      if (!existingContent) {
        return res.status(404).json({
          success: false,
          message: 'Content not found'
        });
      }

      const contentType = req.body.type || existingContent.type || 'blog';
      req.contentType = contentType; // Store for later use
      req.existingFiles = existingContent.urls || [existingContent.url].filter(Boolean);

      // If no files in request and no existing files, and content requires files
      if (!req.files?.files?.length && !req.existingFiles.length && contentType !== 'blog') {
        return res.status(400).json({
          success: false,
          message: 'कृपया फाइल अपडेट करें या मौजूदा फाइल को रखें | Please update file or keep existing file'
        });
      }

      const upload = createContentUpload(contentType);
      upload(req, res, (err) => {
        if (err) return handleMulterErrors(err, req, res, next);
        next();
      });
    } catch (err) {
      next(err);
    }
  },
  validateContent
];

// Routes
router.post('/', ...uploadMiddleware, createContent, cleanupOnError);
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.put('/:id', ...updateMiddleware, updateContent, cleanupOnError);
router.delete('/:id', deleteContent);

// Enhanced error handler (remain same as before)
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