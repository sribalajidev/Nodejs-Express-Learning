// utils/jwt.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

function sign(payload, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verify(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { sign, verify };