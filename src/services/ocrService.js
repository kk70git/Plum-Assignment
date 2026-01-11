const Tesseract = require('tesseract.js');

const processInput = async (input) => {
  // If input is a buffer (image), run OCR
  if (Buffer.isBuffer(input)) {
    const { data: { text } } = await Tesseract.recognize(input, 'eng');
    return text;
  }
  // If it's already text, return as is
  return input;
};

module.exports = { processInput };