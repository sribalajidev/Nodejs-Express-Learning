// routes/index.js
const express = require("express");
const router = express.Router();

// import concept routes
router.use("/auth", require("../concepts/auth-vs-authz"));
router.use("/session", require("../concepts/session-vs-token"));
router.use("/jwt-basics", require("../concepts/jwt-basics"));
router.use("/jwt-login", require("../concepts/jwt-login"));
router.use("/jwt-protected", require("../concepts/jwt-protected"));
router.use("/passwordless", require("../concepts/passwordless"));
// router.use("/role", require("../concepts/role-based"));

module.exports = router;
