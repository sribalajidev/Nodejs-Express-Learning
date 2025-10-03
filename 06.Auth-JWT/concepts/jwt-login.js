// concepts/jwt-login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { sign } = require("../utils/jwt");

const router = express.Router();

// ---- Fake "database" ----
const users = [
  {
    id: 1,
    email: "user@mail.com",
    password: bcrypt.hashSync("password", 8), // hashed password
    role: "user"
  },
  {
    id: 2,
    email: "admin@mail.com",
    password: bcrypt.hashSync("admin123", 8),
    role: "admin"
  }
];

// ---- Login Route ----
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Check password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = sign({ id: user.id, email: user.email, role: user.role });

  res.json({
    message: "Login successful",
    token
  });
});

module.exports = router;

// Breakdown
// | Action                 | Behavior                                                 |
// | ---------------------- | -------------------------------------------------------- |
// | Valid credentials      | Returns JWT                                              |
// | Invalid email/password | 400 error "Invalid credentials"                          |
// | Token payload          | `{ id, email, role }` → can be used later for auth/roles |

// Key takeaway:
// This route turns user input into a dynamic token.
// Later routes like jwt-protected.js or role-based.js verify this token to allow access.

// Flowchart
// User sends login form → Server checks identity → If correct, gives a ticket (JWT)
