const OpenAI = require("openai");
require("dotenv").config(); 

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,  
  apiKey: process.env.OPENROUTER_API_KEY,
});
 
const analyzeBill = async (rawText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert medical bill parser.

Your task is to analyze noisy OCR text and extract financial information.

TASKS:
1. Detect the currency used in the document (e.g., INR, USD, EUR, GBP).
2. Extract all monetary values.
3. Classify each amount as one of:
   - total_bill
   - paid
   - due
4. Normalize OCR errors (e.g., O → 0, l → 1, ₹ → Rs, etc).
5. The "source" field MUST reflect the corrected text, not the original OCR error.
6. Format: source: "text: 'Corrected phrase'".
7. Example: If the input is "Pald: 1000", the source must be "text: 'Paid: 1000'".
8. Map "Rs" to "INR".

RULES:
- If no reliable financial values can be extracted, return exactly:
  { "status": "no_amounts_found", "reason": "document too noisy" }

OUTPUT:
Return ONLY valid JSON in the following schema:

{
  "currency": "string",
  "amounts": [
    { "type": "string", "value": number, "source": "string" }
  ],
  "status": "ok"
}
`
        },
        {
          role: "user",
          content: `Analyze this OCR text and extract billing information:\n"${rawText}"`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (error) {
    console.error("AI Extraction Error:", error);
    return { status: "no_amounts_found", reason: "document too noisy" };
  }
};

module.exports = { analyzeBill };
