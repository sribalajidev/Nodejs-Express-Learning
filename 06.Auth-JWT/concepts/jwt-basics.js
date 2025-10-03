// concepts/jwt-basics.js
const express = require("express");
const router = express.Router();
const { sign, verify } = require("../utils/jwt");

// ---- Generate JWT ----
router.get("/generate", (req, res) => {
  // Example payload
  const payload = {
    id: 1,
    email: "user@mail.com",
    role: "user"
  };

  // Create JWT
  const token = sign(payload, "1h"); // expires in 1 hour
  res.json({
    message: "JWT generated successfully",
    token
  });
});

// ---- Verify JWT ----
router.get("/verify", (req, res) => {
  const token = req.query.token; // client sends token in query

  if (!token) return res.status(400).json({ message: "Token is required" });

  try {
    const decoded = verify(token); // verify using utils/jwt.js
    res.json({
      valid: true,
      decoded
    });
  } catch (err) {
    res.status(401).json({
      valid: false,
      error: err.message
    });
  }
});

module.exports = router;


// Breakdown
// | Route                 | Action                                  |
// | --------------------- | --------------------------------------- |
// | `/generate`           | Creates a new JWT from payload          |
// | `/verify`             | Checks JWT signature & expiration       |
// | Invalid/expired token | Returns error                           |
// | Payload in JWT        | Can include user id, email, roles, etc. |

// This file is a playground to understand JWT creation & verification.
// Later, jwt-login.js and jwt-protected.js use this logic in real authentication flows.
