const { processInput } = require('../services/ocrService');
const { analyzeBill } = require('../services/aiService');

const processMedicalDocument = async (req, res) => {
  try { 
    // 1. Extract input (from a file upload or a JSON text field)
    const inputData = req.file ? req.file.buffer : req.body.text;
    if (!inputData) {
      return res.status(400).json({ error: "Please provide an image or text input." });
    }

    // 2. Step 1: Raw Text Extraction (OCR if necessary)
    const rawText = await processInput(inputData);

    // 3. Step 2-4: AI Normalization and Classification
    const result = await analyzeBill(rawText);

    // Manual Guardrail Logic Check
    if (result.status === "ok") {
      const total = result.amounts.find(a => a.type === "total_bill")?.value || 0;
      const paid = result.amounts.find(a => a.type === "paid")?.value || 0;
      const due = result.amounts.find(a => a.type === "due")?.value || 0;

      // Check if Paid + Due = Total (Allow for 1 unit of difference for rounding)
      if (total !== 0 && Math.abs((paid + due) - total) > 1) {
        result.warning = "Math mismatch detected: Paid + Due does not equal Total.";
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ status: "error", message: "Failed to process document." });
  }
};

module.exports = { processMedicalDocument };