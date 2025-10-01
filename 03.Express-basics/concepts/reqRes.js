const express = require('express');
const router = express.Router();

// GET request with query
router.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

// GET request with URL params
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: 'User found' });
});

// GET request for browser testing
router.get('/data', (req, res) => {
  res.send({
    message: "This is GET request",
    info: "Use Postman to POST data here"
  });
});

// // POST request to receive JSON data
router.post('/data', (req, res) => {
  const data = req.body; // Get JSON data sent from Postman
  res.status(201).json({
    message: "POST request successful",
    receivedData: data
  });
});


module.exports = router;

// Example URLs to test:
// http://localhost:3000/greet
// http://localhost:3000/api/concepts/greet?name=Sri
// http://localhost:3000/api/concepts/data (GET request in browser, POST request to receive JSON from postman: body data should be feed in postman)