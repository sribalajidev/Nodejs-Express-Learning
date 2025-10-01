// routes/basicRoutes.js

const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.send('Hello Express! Your server is running.');
});

// Another sample route
router.get('/about', (req, res) => {
  res.send('This is the About page.');
});

module.exports = router;

// Example URLs to test:
// http://localhost:3000/
// http://localhost:3000/about