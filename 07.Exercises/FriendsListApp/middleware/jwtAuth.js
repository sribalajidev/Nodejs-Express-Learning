// Check for JWT in session or Authorization header
const { verify } = require("../utils/jwt");

// ---- Middleware to protect routes ----
function jwtAuthMiddleware(req, res, next) {
  const token = req.session.authorization?.accessToken; // from session
  if (!token) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  try {
    const user = verify(token); // verify token
    req.user = user; // attach user info to request
    next(); // allow access to route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = jwtAuthMiddleware;