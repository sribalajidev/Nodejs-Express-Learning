// Friend list app - authentication JWT and CRUD

const express = require('express');
const session = require("express-session"); // adding session based

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Apply session middleware **before routes**
app.use(
    session({
        secret: "session_secret_key", // normally from .env
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // true only if HTTPS
    })
);

// Import routes
const auth = require('./routes/auth');
const jwtAuth = require('./middleware/jwtAuth');
const friendsRoute = require('./routes/friends');

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello Backend! This is Friends List App.');
});

app.use('/', auth);
app.use('/friends', jwtAuth, friendsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});