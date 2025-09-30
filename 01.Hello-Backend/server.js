// server.js

// Import Express
const express = require('express');

// Create an Express app
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

// Import Routes
const demoRoutes = require('./routes/demoRoutes');

// Middleware to parse JSON request body
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello Backend! This is your first Node.js + Express app.');
});

// Define Routes
app.use('/api', demoRoutes); // Test in browser or postman = http://localhost:3000/api/demo

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
