# 🩺 Medical Billing OCR Parser

A specialized Node.js/Express backend service designed to extract and intelligently auto-correct financial data from medical bill OCR text. This project was developed as a technical assessment for **Plum**.

**Live Backend Link:** [https://plum-assignment-7zqq.onrender.com](https://plum-assignment-7zqq.onrender.com)

---

## 🌟 Project Overview
Handling OCR data from medical bills is challenging due to "noisy" text. This solution leverages AI to not only extract data but to perform a **Deep Correction** pass, ensuring the final output is clean, standardized, and ready for insurance processing.

## ✨ Key Features
* **Deep Text Correction**: Automatically fixes common OCR errors (e.g., "Pald" → "Paid", "l200" → "1200") in both the structured fields and the source snippets.
* **Currency Normalization**: Automatically normalizes all financial values to **INR**, regardless of the input currency (USD, Rs, etc.).
* **Intelligent Field Classification**: Extracts and maps `total_bill`, `paid`, `due`, and `discount` types.
* **Stream-Safe Architecture**: Optimized middleware ordering ensures that file upload streams are handled correctly without interference from general body parsers.

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v14+)
* An **OpenRouter API Key**

### 2. Installation
<!-- ```bash -->

* git clone <your-repo-link>
* cd medical-billing-parser
* npm install

### 3. Environment Variables
* PORT=5000
* OPENROUTER_API_KEY=your_api_key_here
* OPENROUTER_BASE_URL=[https://openrouter.ai/api/v1](https://openrouter.ai/api/v1)

---

## 🧪 Testing & Validation

To verify the **Deep Correction** and **Currency Normalization** logic, use the following test case in Postman:

* **Endpoint:** `POST /api/amounts/process`
* **Method:** `POST`
* **Sample Input:**
  
    ```json
    {
      "text": "Total: INR 1200 | Paid: 1000 | Due: 200 | Discount: 10%"
    }
    ```

### ✅ Successful Extraction Example
The following screenshot demonstrates the system accurately parsing the input text into a structured JSON response with a **200 OK** status.
 
<img width="707" height="375" alt="image" src="https://github.com/user-attachments/assets/2e0fd7c8-308d-47e0-9606-c35d6d749d9d" />


**Key Observations in the Response:**
* **Currency Standardization**: The output correctly identifies "INR" as the primary currency.
* **Structured Mapping**: Data points like `total_bill`, `paid`, and `due` are mapped to numerical values.
* **Audit Trail**: The `source` field captures exactly where the AI extracted the information from the original text.   
