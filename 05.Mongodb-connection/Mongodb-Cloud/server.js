const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // To load MONGO_URI from .env

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import routes
const noteRoutes = require('./routes/noteRoutes');  // Route from noteRoutes

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) 
.then(() => console.log('MongoDB Cloud connected successfully'))
.catch(err => console.error('MongoDB Cloud connection error:', err));

// 2. Define a simple route
app.get('/', (req, res) => {
  res.send('Hello MongoDB Cloud with Node.js + Express!');
});

app.use('/api/notes', noteRoutes); // This route will render noteRoutes.js file

// 3. Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
