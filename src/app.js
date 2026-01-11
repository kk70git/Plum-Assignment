require('dotenv').config();
const express = require('express');
const cors = require('cors');
const amountRoutes = require('./routes/amountRoutes');

const app = express();

// 1. Basic Middleware 
app.use(cors());
app.use(express.json()); 
 
// 2. Routes 
app.use('/api/amounts', amountRoutes);

// 3. Simple Error Handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});