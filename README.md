# 🩺 Medical Billing OCR Parser  
**AI-Powered Financial Data Extraction for Healthcare Documents**

An intelligent **Node.js + Express** backend that converts noisy OCR output from medical bills into **clean, structured, and validated financial data**.  
Built as a technical assessment project for **Plum (Health Insurance Platform)**.

---

## 🌟 Why This Project Exists

Medical bills often contain OCR errors like:

T0tal → Total
Pald → Paid
l200 → 1200


Such noise breaks automation pipelines for:
- Insurance claims
- Reimbursements
- Hospital accounting

This system applies **AI-based deep correction + structured parsing** to transform raw OCR text into **trustworthy billing data**.

---

## ✨ Core Features

### 🔍 Deep OCR Error Correction
Fixes real-world OCR mistakes automatically:
- `Pald` → `Paid`
- `l200` → `1200`
- `T0tal` → `Total`

Corrections apply to:
- Extracted values  
- Original source snippets (for auditability)

---

### 💱 Intelligent Currency Detection & Normalization
Detects currencies such as:
- INR
- USD
- EUR
- GBP  

and normalizes them for consistent downstream processing.

---

### 🧠 Smart Financial Classification
Each amount is categorized into:
- `total_bill`
- `paid`
- `due`
- `discount`

with full traceability to the original OCR text.

---

### 🧵 Stream-Safe API Design
Middleware is ordered to correctly handle:
- Multipart OCR uploads  
- JSON payloads  
- AI processing  

This prevents file-stream corruption — a common production bug.

---

## 🏗️ System Architecture



OCR Text
↓
Express API
↓
AI Normalization Engine
↓
Structured JSON Output
↓
Insurance / Billing Systems


---

## 🚀 Getting Started

### ⚙️ Installation


git clone <your-repo-url>
cd medical-ocr-backend
npm install

🔑 Environment Setup

Create a .env file in the project root:

PORT=5000
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

▶️ Run the Server
npm start


Server will start on:

http://localhost:5000

🧪 Testing the AI Parser
Endpoint
POST /api/amounts/process

Sample Request
{
  "text": "T0tal: USD l200 | Pald: 1000 | Due: 200 | Discount: 10%"
}

Example AI Output
{
  "currency": "USD",
  "amounts": [
    { "type": "total_bill", "value": 1200, "source": "text: 'Total: USD 1200'" },
    { "type": "paid", "value": 1000, "source": "text: 'Paid: 1000'" },
    { "type": "due", "value": 200, "source": "text: 'Due: 200'" }
  ],
  "status": "ok"
}


Notice:

OCR errors corrected

Currency detected

Values structured

Original phrases preserved

🛡️ Error Handling

The system is designed to be production-safe.

Scenario	Response
No usable billing data	{ "status": "no_amounts_found", "reason": "document too noisy" }
AI failure / timeout	Structured error response
Invalid OCR	Graceful fallback
🧠 Key Design Decisions
Middleware Ordering

Routes are mounted before express.json() to preserve multipart file streams for OCR uploads.

Prompt Engineering

The AI is instructed as a medical billing editor, not just a parser — enabling:

Error correction

Currency inference

Source validation

This drastically reduces hallucinations.

🏆 Why This Matters for Plum

This backend mirrors real health-insurance pipelines:

Hospital Bill → OCR → AI Normalization → Claim Processing → Payout


It demonstrates:

Backend API design

AI integration

Data reliability

Production-grade error handling