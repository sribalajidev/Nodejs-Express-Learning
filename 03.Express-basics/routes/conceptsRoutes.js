// Routing (GET, POST, Params, Query Strings)
const express = require('express');
const router = express.Router();

// GET request
router.get('/hello', (req, res) => {
  res.send({ message: "Hello! This is a GET route" });
});

// POST request
router.post('/hello', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: "POST successful", received: data });
});

// Route with parameters
router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, message: "User found" });
});

// Route with query string
router.get('/search', (req, res) => {
  const { term } = req.query;
  res.json({ query: term, message: "Search results placeholder" });
});

module.exports = router;


// Example URLs to test:
// GET: http://localhost:3000/api/routing/hello
// POST: http://localhost:3000/api/routing/hello (use Postman body JSON)
// GET with param: http://localhost:3000/api/routing/user/123
// GET with query: http://localhost:3000/api/routing/search?term=nodejs