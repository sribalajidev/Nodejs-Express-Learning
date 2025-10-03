// concepts/role-based.js
const express = require("express");
const router = express.Router();
const { verify } = require("../utils/jwt");

// ---- Middleware to authenticate JWT ----
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ---- Middleware to check role ----
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// ---- Routes ----
router.get("/user-dashboard", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
  res.json({ message: "Welcome to user dashboard", user: req.user });
});

router.get("/admin-dashboard", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome to admin dashboard", user: req.user });
});

module.exports = router;

// Breakdown
// | Route                 | Allowed Roles | Result                        |
// | --------------------- | ------------- | ----------------------------- |
// | `/user-dashboard`     | user, admin   | Access granted if JWT valid   |
// | `/admin-dashboard`    | admin         | Access granted only for admin |
// | Invalid/expired token | any           | 403 Forbidden                 |
// | Role not allowed      | any           | 403 Access denied             |

// Key Takeaways:
// - RBAC is authorization: determines what authenticated users can do
// - Uses JWT payload to check role
// - Works seamlessly with previous JWT login & protected route logic