// concepts/auth-vs-authz.js
const express = require("express");
const router = express.Router();

// simple demonstration
router.get("/", (req, res) => {
  res.json({
    authentication: "Who are you? (Identity verification, e.g. login)",
    authorization: "What can you do? (Permissions, e.g. role-based access)"
  });
});

module.exports = router;
