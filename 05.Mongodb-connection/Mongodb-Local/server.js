const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import routes
const noteRoutes = require('./routes/noteRoutes');  // Route from noteRoutes

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// 2. Define a simple route
app.get('/', (req, res) => {
  res.send('Hello MongoDB with Node.js + Express!');
});

app.use('/api/notes', noteRoutes); // This route will render noteRoutes.js file

// 3. Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
