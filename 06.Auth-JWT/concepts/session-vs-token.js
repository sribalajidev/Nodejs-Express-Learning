// concepts/session-vs-token.js
const express = require("express");
const session = require("express-session");
const { sign, verify } = require("../utils/jwt");

const router = express.Router();

// ------------------ SESSION BASED DEMO ------------------ //
router.use(
  session({
    secret: "session_secret_key", // normally from .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure:true only if HTTPS
  })
);

// login using session
router.post("/session-login", (req, res) => {
  const { email } = req.body;

  // in real app: validate against DB
  if (!email) return res.status(400).json({ message: "Email required" });

  req.session.user = { email };
  res.json({ message: "Logged in with session", sessionUser: req.session.user });
});

// protected route using session
router.get("/session-protected", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in (session)" });
  }
  res.json({ message: "Session protected route accessed", user: req.session.user });
});

// logout session
router.post("/session-logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out (session)" });
  });
});


// ------------------ TOKEN BASED DEMO ------------------ //
// login using JWT(JSON Web Token)
router.post("/token-login", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  const token = sign({ email }); // sign payload with secret
  res.json({ message: "Logged in with token", token });
});

// protected route using JWT
router.get("/token-protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verify(token);
    res.json({ message: "Token protected route accessed", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;



// Behavior Difference
// | Feature              | Session-based                       | Token-based (JWT)                               |
// | -------------------- | ----------------------------------- | ----------------------------------------------- |
// | Where is user state? | Stored on server (memory/DB)        | Inside the JWT itself (client)                  |
// | Client sends what?   | Cookie (auto)                       | Authorization header (manual)                   |
// | Server checks how?   | Looks up session in memory/DB       | Verifies JWT signature                          |
// | Scalability          | Harder (server must store sessions) | Easier (stateless, any server can verify token) |
// | Logout               | Destroy session                     | Delete token client-side (server doesn’t track) |

// Flow
// Login → store session / create token → send response → protected route → verify session / token → allow access
