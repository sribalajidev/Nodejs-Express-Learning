const express = require("express");
const { sign } = require("../utils/jwt");

const router = express.Router();

let users =[];

// check if username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true; // username exists
    } else {
        return false; // username does not exist
    }
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

// register user
router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if(!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        }
        else {
            return res.status(404).json({message: "User already exists"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
})

// Login User
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const user = authenticatedUser(username, password);
    if (!user) {
        return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Sign JWT with username
    const token = sign({ username: user.username }, "60s");

    // Store token in session
    req.session.authorization = { accessToken: token, username: user.username };

    res.json({ message: "Login successful", token });
});

module.exports = router;