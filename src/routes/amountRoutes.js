const express = require('express');
const router = express.Router();
const multer = require('multer');
const amountController = require('../controllers/amountController');

// Configure multer for memory storage (best for SDE assignments)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit for security
});

// Main endpoint: handles both text and image
// Wrap multer invocation so any parsing errors are forwarded to Express error handler
router.post('/process', (req, res, next) => {
  upload.single('file')(req, res, function(err) {
    if (err) return next(err); // multer/busboy parsing error forwarded to errorHandler
    return amountController.processMedicalDocument(req, res, next);
  });
});

module.exports = router;