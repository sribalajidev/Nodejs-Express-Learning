// This file demonstrates REST API principles

const express = require('express');
const router = express.Router();

// Example resource: notes
router.get('/', (req, res) => {
  res.json({ message: "This is a GET request to fetch notes (REST principle: stateless & resource-based)" });
});

module.exports = router;
