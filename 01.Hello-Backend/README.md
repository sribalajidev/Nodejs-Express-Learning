
# 01-Hello-Backend

## Overview
This folder covers the basics of **Node.js** and **Express** by creating a simple backend application from scratch.  
You will learn how to set up a Node.js server, create routes, handle HTTP requests, and run your backend app.

---

## Prerequisites
- Node.js installed on your system (v14+ recommended)
- Basic understanding of JavaScript
- Terminal/Command Prompt usage
- Optional: Postman for testing API routes

---

## Why Backend?
A backend application handles:
- Business logic
- Data storage and retrieval
- API endpoints for front-end consumption
- Security and authentication

In this topic, we focus on the **fundamentals**: creating a server and defining routes.

---

## Step 1: Initialize the project
Open your terminal:

```bash
# Create a new project folder
mkdir hello-backend
cd hello-backend

# Initialize Node.js project
npm init -y

# Install Express.js
npm install express
```

This creates:
- `package.json` – project metadata and dependencies  
- `package-lock.json` – locks dependency versions  
- `node_modules/` – installed packages  

---

## Step 2: Create project structure
Create the following files and folders manually:

```
hello-backend/
├── server.js
├── routes/
│   └── demoRoutes.js
└── package.json
```

**File purposes:**
- `server.js` – Entry point of the app, creates Express server, defines port, imports routes  
- `routes/` – Folder for route definitions  
- `demoRoutes.js` – Example route file  

---

## Step 3: Writing the server code

**server.js**

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import Routes
const demoRoutes = require('./routes/demoRoutes');

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello Backend! This is your first Node.js + Express app.');
});

// Use demo routes
app.use('/api', demoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

**routes/demoRoutes.js**

```javascript
const express = require('express');
const router = express.Router();

// Example GET route
router.get('/demo', (req, res) => {
  res.send('This is a demo route!');
});

module.exports = router;
```

---

## Step 4: Running the server
In the terminal:

```bash
node server.js
```

Visit:
- `http://localhost:3000/` → "Hello Backend! This is your first Node.js + Express app."
- `http://localhost:3000/api/demo` → "This is a demo route!"

**Tip:** Use `nodemon server.js` for automatic reload on file changes.

---

## How it works
1. `server.js` creates the Express app and defines the port.  
2. Middleware `express.json()` parses JSON request bodies.  
3. `demoRoutes.js` defines routes using `express.Router()`.  
4. Routes are imported in `server.js` with `require()` and registered using `app.use()`.  
5. The server listens for HTTP requests at the defined port.  

---

## Importing Modules in Node.js

In Node.js, there are **two module systems**:

1. **CommonJS (CJS)** – uses `require()` and `module.exports`.
2. **ES Modules (ESM)** – uses `import` and `export`.

By default, Node.js uses **CommonJS**, so you will usually see `require()` in backend projects. Most tutorials, including Coursera, use this.

---

## Using `require` (CommonJS)

```javascript
// import express
const express = require('express');

// import your route
const demoRoutes = require('./routes/demoRoutes');
```

---

## Using `import` (ES Modules)

If you want to use ES Modules syntax (`import/export`) in Node.js:

1. In `package.json`, add:

```json
{
  "type": "module"
}
```

2. Then you can use:

```javascript
// import express
import express from 'express';

// import your route
import demoRoutes from './routes/demoRoutes.js';
```

### Notes:

* With ES Modules, file extensions are **mandatory** (`.js` at the end).
* Some older Node.js libraries expect CommonJS, so `require()` is still more common.
* For learning backend basics, stick with `require()` for now. You can explor

---

## Key Concepts Learned
- Node.js basics and asynchronous nature
- Modules: `require` and `module.exports`
- Creating an Express app
- Middleware and JSON parsing
- Defining routes and using `express.Router()`
- Running the server with Node.js

---

## Next Steps
Proceed to **02-Async-Callbacks** to learn about callbacks, promises, and asynchronous programming in Node.js.
