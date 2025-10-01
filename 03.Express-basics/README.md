# 03 – Express Basics

This folder covers the fundamentals of **Express.js**, including how to set up an Express server, handle requests/responses, create routes, implement middleware, and use third-party middleware. By the end of this topic, you’ll have a clear understanding of how to build structured and maintainable Express applications.

---

## Topics Covered

1. Setting up an Express server
2. Express request and response objects
3. Routing (GET, POST, params, query strings)
4. Middleware basics (custom middleware + `next()`)
5. Third-party middleware (body-parser / express.json / logging middleware)

---

## Objectives

* Understand how to initialize an Express app.
* Learn how to work with `req` and `res` objects.
* Create multiple routes (GET, POST) with parameters and query strings.
* Build custom middleware and understand the `next()` flow.
* Integrate third-party middleware like `body-parser` or `morgan` for logging.

---

## Prerequisites

* Node.js installed (LTS recommended).
* Basic knowledge of JavaScript (ES6).
* Familiarity with `npm init` and installing packages.

---

## Required Modules

* **express**: `npm install express`
* **morgan** (for logging): `npm install morgan`
* **body-parser** (optional, older apps): `npm install body-parser`

---

## Setting Up an Express Server

**server.js**

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express! Your server is up and running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

💡 **Use case**: Base of every Express application, starts server, handles initial routes.

---

## Express Request & Response Objects

Example in `routes/reqRes.js`:

```javascript
const express = require('express');
const router = express.Router();

router.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ message: `Hello, ${name}` });
});

router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: 'User found' });
});

router.post('/data', (req, res) => {
  const data = req.body;
  res.status(201).json({ received: data });
});

module.exports = router;
```

In `server.js`:

```javascript
const reqResRoutes = require('./routes/reqRes');
app.use('/api/concepts', reqResRoutes);
```

💡 **Use case**: Build dynamic APIs for different user inputs.

---

## Routing (GET, POST, Params, Query Strings)

```javascript
const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({ message: 'This is GET request', info: 'Use Postman to POST data here' });
});

router.post('/data', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: 'POST request successful', receivedData: data });
});

module.exports = router;
```

💡 **Use case**: GET for reading data, POST for sending/creating data.

---

## Middleware Basics (Custom + next())

```javascript
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
```

In route file:

```javascript
const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');

router.use(logger);
router.get('/hello', (req, res) => {
  res.json({ message: 'Middleware example route' });
});

module.exports = router;
```

In `server.js`:

```javascript
const middlewareExample = require('./routes/middleware');
app.use('/api/middleware', middlewareExample);
```

💡 **Use case**: Logging, authentication, validation.

---

## Third-Party Middleware

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
```

💡 **Use case**: Parse incoming data, log requests in production.

---

## Benefits of Using Express Basics

* Cleaner code with routing & middleware separation.
* Handle GET/POST, query, params easily.
* Scalable structure by splitting routes & middleware.
* Quick debugging with morgan/loggers.

---

## Summary Table

| Concept                   | What You Learned                          | Use Case Example                    |
| ------------------------- | ----------------------------------------- | ----------------------------------- |
| Setting up Express Server | Start server, listen on port              | Hello Express app                   |
| Request/Response Objects  | req.params, req.query, req.body           | Dynamic APIs (user/:id, ?name=Sri)  |
| Routing                   | GET/POST routes with params & queries     | CRUD APIs                           |
| Middleware Basics         | Custom middleware + next()                | Logging, authentication, validation |
| Third-Party Middleware    | body-parser, express.json, morgan logging | Production-ready Express apps       |

---