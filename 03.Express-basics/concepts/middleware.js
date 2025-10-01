const express = require('express');
const router = express.Router();

// Custom middleware (local, used only in selected routes)
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Route with middleware
router.get('/hello', logger, (req, res) => {
  res.send('Hello World with middleware!');
});

// Route without middleware
router.get('/plain', (req, res) => {
  res.send('Hello World without middleware!');
});

// Example of global middleware applied to all routes inside this file
router.use((req, res, next) => {
  console.log("Global middleware for /api/middleware routes only");
  next();
});

router.get('/check', (req, res) => {
  res.send("Global middleware worked before this response");
});

module.exports = router;

// Example URLs to test:
// http://localhost:3000/api/middleware/hello → runs logger middleware + returns text
// http://localhost:3000/api/middleware/plain → runs with no middleware
// http://localhost:3000/api/middleware/check → runs global middleware (applied to every route in middleware.js)