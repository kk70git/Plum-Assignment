// Central error handler for Express and multer/busboy errors
module.exports = (err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);

  // Multer file-size limit
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ status: 'error', message: 'File too large' });
  }

  // Common busboy parsing error (malformed multipart)
  if (err && typeof err.message === 'string' && err.message.toLowerCase().includes('malformed part header')) {
    return res.status(400).json({ status: 'error', message: 'Malformed multipart request. Ensure Content-Type includes a proper boundary and the request is valid.' });
  }

  // Multer-specific errors
  if (err && err.name === 'MulterError') {
    return res.status(400).json({ status: 'error', message: err.message });
  }

  res.status(500).json({ status: 'error', message: 'Internal server error' });
};
