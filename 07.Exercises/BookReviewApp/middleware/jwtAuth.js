const { verify } = require("../utils/jwt");

// Middleware to protect routes
function jwtAuth(req, res, next) {
    const token = req.session.authorization?.accessToken;
    if (!token) return res.status(403).json({ message: "User not authenticated" });

    try {
        const user = verify(token);  // decode token
        req.user = user;             // attach user info
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = jwtAuth;