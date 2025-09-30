const express = require('express');
const router = express.Router();

router.get('/demo', (req, res) => {
  res.send('This is a demo route!');
});

module.exports = router;