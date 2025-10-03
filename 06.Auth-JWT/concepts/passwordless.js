// concepts/passwordless.js
const express = require("express");
const router = express.Router();
const { sign, verify } = require("../utils/jwt");

const users = [
  { id: 1, email: "user@mail.com", role: "user" },
  { id: 2, email: "admin@mail.com", role: "admin" }
];

// ---- Request Magic Link ----
router.post("/request-link", (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ message: "Email not found" });

  // Create a short-lived token (5 minutes)
  const token = sign({ id: user.id, email: user.email, role: user.role }, "5m");

  // In real apps: send token as email link
  const magicLink = `http://localhost:3000/concepts/passwordless/login?token=${token}`;

  res.json({
    message: "Magic link generated (normally sent via email)",
    magicLink
  });
});

// ---- Login using Magic Link ----
router.get("/login", (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ message: "Token required" });

  try {
    const decoded = verify(token); // verify token
    res.json({
      message: "Logged in successfully via magic link",
      user: decoded
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;

// Breakdown
// | Action                | Result                                   |
// | --------------------- | ---------------------------------------- |
// | Email exists          | Returns magic link with short-lived JWT  |
// | Email not found       | 400 error "Email not found"              |
// | Valid token           | Logged in successfully, payload returned |
// | Expired/invalid token | 401 error "Invalid or expired token"     |

// Key takeaway:
// - This shows passwordless authentication flow using JWT.
// - Later in real apps, frontend uses this link to automatically log the user in.
// - Reduces the need for storing passwords.

// Flowchart:
// [User enters email] --> POST /request-link --> [Server generates JWT] --> Magic Link sent to email
// [User clicks Magic Link] --> GET /login?token=JWT --> [Server verifies JWT] --> Logged in

// Traditional JWT Login Flow (jwt-login.js):
// [User enters email/password] --> POST /jwt-login --> [Server checks credentials] --> JWT sent back
