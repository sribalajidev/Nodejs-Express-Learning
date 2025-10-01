// server.js

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Import route
const asyncRoutes = require('./routes/asyncRoutes');

// define basic route
app.get('/', (req, res) => {
  res.send('Async Callback POC');
});

app.use('/api/async', asyncRoutes); // Test in browser or postman = http://localhost:3000/api/async/test

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});