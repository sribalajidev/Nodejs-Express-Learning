// concepts/jwt-protected.js
const express = require("express");
const router = express.Router();
const { verify } = require("../utils/jwt");

// ---- Middleware to protect routes ----
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  try {
    const decoded = verify(token); // verify token using utils/jwt.js
    req.user = decoded; // attach payload to request
    next(); // allow access to next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ---- Protected Route ----
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to your dashboard",
    user: req.user // comes from JWT payload
  });
});

// Example: another protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Here is your profile data",
    user: req.user
  });
});

module.exports = router;

// Breakdown
// | Action                   | Result                                          |
// | ------------------------ | ----------------------------------------------- |
// | Valid JWT sent in header | Access granted; payload available in `req.user` |
// | No token sent            | 401 Unauthorized                                |
// | Invalid/expired token    | 403 Forbidden                                   |

// Flowchart
// [User/Login form] --(email/password)--> [jwt-login.js] --(JWT)--> [Client]
// [Client] --(JWT in Authorization header)--> [jwt-protected.js] --(verify token)--> Access granted

// So even though we didn’t import jwt-login.js in jwt-protected.js, they are connected through the token and client.

// Summary:
// - jwt-login.js → generates token
// - Client → stores token
// - jwt-protected.js → verifies token on requests
// - Server-side modules never directly call each other; the flow happens through the token and the client.

// Flow Summary (Frontend Perspective)
// [User] → Login Form → [Frontend] → POST /jwt-login → [Backend] → Validate → JWT → [Frontend stores token]
// [User] → Clicks "Dashboard" → Frontend → GET /dashboard with JWT → Backend verifies → Return data → Frontend renders
